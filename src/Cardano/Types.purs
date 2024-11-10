module Cardano.Types where

import Custom.Prelude

import Data.Argonaut.Core (Json, caseJsonArray, caseJsonString)
import Data.Argonaut.Core as Json
import Data.Array as Array
import Data.Codec ((~))
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Codec.Argonaut.Record as CAR
import Data.Codec.Argonaut.Sum as CAS
import Data.Int as Int
import Data.Newtype (class Newtype, unwrap)
import Data.Profunctor (dimap)
import Data.String (Pattern(..))
import Data.String as String
import JS.BigInt (BigInt)
import JS.BigInt as BigInt

newtype TxIn = TxIn String

instance Show TxIn where
  show (TxIn txIn) = txIn

splitTxIn ∷ TxIn → { txId ∷ TxId, txIx ∷ Int }
splitTxIn (TxIn txIn) =
  let
    { before: txId, after: txIx } = String.splitAt 64 txIn
  in
    { txId: TxId txId
    , txIx: case Int.fromString =<< String.stripPrefix (Pattern "#") txIx of
        Nothing → -1
        Just ix → ix
    }

newtype TxId = TxId String

instance Show TxId where
  show (TxId txId) = txId

derive instance newtypeTxId ∷ Newtype TxId _

codecTxId ∷ JsonCodec TxId
codecTxId = CA.coercible "TxId" CA.string

newtype TxIx = TxIx Int

instance Show TxIx where
  show (TxIx txIx) = show txIx

derive instance newtypeTxIx ∷ Newtype TxIx _

codecTxIx ∷ JsonCodec TxIx
codecTxIx = CA.coercible "TxIx" CA.int

newtype Address = Address String

instance Show Address where
  show (Address address) = address

type Value = { assets ∷ Array AssetQuantity }

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

codecAddress ∷ JsonCodec Address
codecAddress = CA.coercible "Address" CA.string

codecTxIn ∷ JsonCodec TxIn
codecTxIn = CA.coercible "TxIn" CA.string

codecValue ∷ JsonCodec Value
codecValue = dimap _.assets { assets: _ } (CA.array codecAssetQuantity)
  where
  codecAssetQuantity ∷ JsonCodec AssetQuantity
  codecAssetQuantity =
    CA.indexedArray "AssetQuantity"
      $ (\asset quantity → AssetQuantity { asset: asset, quantity: quantity })
      <$> ((unwrap >>> _.asset) ~ CA.index 0 codecAsset)
      <*> ((unwrap >>> _.quantity) ~ CA.index 1 codecBigInt)

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

codecBigInt ∷ JsonCodec BigInt
codecBigInt =
  CA.prismaticCodec "BigInt" BigInt.fromNumber BigInt.toNumber CA.number

newtype ScriptHash = ScriptHash String

derive instance newtypeScriptHash ∷ Newtype ScriptHash _

codecScriptHash ∷ JsonCodec ScriptHash
codecScriptHash = CA.coercible "ScriptHash" CA.string

data ScriptStatus
  = DeploymentInitiated
  | DeploymentCompleted

renderScriptStatus ∷ ScriptStatus → String
renderScriptStatus DeploymentInitiated = "deploy-initiated"
renderScriptStatus DeploymentCompleted = "deploy-completed"

codecScriptStatus ∷ JsonCodec ScriptStatus
codecScriptStatus = CAS.enumSum renderScriptStatus case _ of
  "deploy-initiated" → Just DeploymentInitiated
  "deploy-completed" → Just DeploymentCompleted
  _ → Nothing

type ScriptDeployment =
  { scriptHash ∷ ScriptHash
  , scriptStatus ∷ ScriptStatus
  , scriptTxId ∷ TxId
  , scriptTxOut ∷ TxIx
  }

codecScriptDeployment ∷ JsonCodec ScriptDeployment
codecScriptDeployment =
  CAR.object "ScriptDeployment"
    { scriptHash: codecScriptHash
    , scriptStatus: codecScriptStatus
    , scriptTxId: codecTxId
    , scriptTxOut: codecTxIx
    }
