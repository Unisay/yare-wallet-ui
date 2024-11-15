module Cardano.Value where

import Custom.Prelude

import Data.Argonaut.Core (Json, caseJsonArray, caseJsonString)
import Data.Argonaut.Core as Json
import Data.Array as Array
import Data.Codec ((~))
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Newtype (class Newtype, unwrap)
import Data.Profunctor (dimap)
import Data.String as String
import JS.BigInt (BigInt)
import JS.BigInt as BigInt

type Value = { assets ∷ Array AssetQuantity }

codecValue ∷ JsonCodec Value
codecValue = dimap _.assets { assets: _ } (CA.array codecAssetQuantity)
  where
  codecAssetQuantity ∷ JsonCodec AssetQuantity
  codecAssetQuantity =
    CA.indexedArray "AssetQuantity"
      $ (\asset quantity → AssetQuantity { asset: asset, quantity: quantity })
      <$> ((unwrap >>> _.asset) ~ CA.index 0 codecAsset)
      <*> ((unwrap >>> _.quantity) ~ CA.index 1 codecBigInt)

  codecBigInt ∷ JsonCodec BigInt
  codecBigInt =
    CA.prismaticCodec "BigInt" BigInt.fromNumber BigInt.toNumber CA.number

valueLovelace ∷ Value → BigInt
valueLovelace { assets } =
  Array.find (\(AssetQuantity { asset }) → asset == Ada) assets
    |> case _ of
      Just (AssetQuantity { quantity }) → quantity
      Nothing → zero

newtype AssetQuantity = AssetQuantity { asset ∷ Asset, quantity ∷ BigInt }

derive instance newtypeAssetQuantity ∷ Newtype AssetQuantity _

instance showAssetQuantity ∷ Show AssetQuantity where
  show (AssetQuantity { asset, quantity }) =
    show asset <> " " <> show quantity

data Asset = Ada | Asset { assetId ∷ String, policyId ∷ String }

derive instance eqAsset ∷ Eq Asset

instance showAsset ∷ Show Asset where
  show Ada = "Ada"
  show (Asset { assetId, policyId }) = policyId <> "." <> assetId

codecAsset ∷ JsonCodec Asset
codecAsset = CA.codec' decode encode
  where
  decode ∷ Json → Either CA.JsonDecodeError Asset
  decode json = caseJsonString
    (caseJsonArray (Left (CA.UnexpectedValue json)) (decodeAsset json) json)
    (decodeAda json)
    json

  decodeAda ∷ Json → String → Either CA.JsonDecodeError Asset
  decodeAda _ "lovelace" = Right Ada
  decodeAda json _ = Left (CA.UnexpectedValue json)

  decodeAsset ∷ Json → Array Json → Either CA.JsonDecodeError Asset
  decodeAsset _ [ policyIdJson, assetIdJson ]
    | Just policyId ← Json.toString policyIdJson
    , Just assetId ← Json.toString assetIdJson
    , not (String.null policyId)
        && not (String.null assetId) = Right (Asset { policyId, assetId })
  decodeAsset json _ = Left (CA.UnexpectedValue json)

  encode ∷ Asset → Json
  encode Ada =
    Json.fromString "lovelace"
  encode (Asset { policyId, assetId }) =
    Json.fromArray [ Json.fromString policyId, Json.fromString assetId ]
