module Cardano.Value
  ( module Asset
  , module TokenName
  , module Policy
  , Value
  , codecValue
  , valueLovelace
  , AssetQuantity
  , codecAssetQuantity
  ) where

import Custom.Prelude

import Cardano.Value.Asset
  ( Asset(..)
  , codecAsset
  ) as Asset
import Cardano.Value.Token.Name
  ( TokenName
  , codecTokenName
  , parseTokenName
  , printTokenName
  , readTokenName
  , unsafeTokenName
  ) as TokenName
import Cardano.Value.Token.Policy
  ( Policy
  , codecPolicy
  , parsePolicy
  , printPolicy
  , readPolicy
  , unsafePolicy
  ) as Policy

import Data.Array as Array
import Data.Codec ((~))
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Profunctor (dimap)
import JS.BigInt (BigInt)
import JS.BigInt as BigInt

type Value = { assets ∷ Array AssetQuantity }

type AssetQuantity = { asset ∷ Asset.Asset, quantity ∷ BigInt }

codecValue ∷ JsonCodec Value
codecValue = dimap _.assets { assets: _ } (CA.array codecAssetQuantity)

codecAssetQuantity ∷ JsonCodec AssetQuantity
codecAssetQuantity =
  CA.indexedArray "AssetQuantity"
    $ (\asset quantity → { asset: asset, quantity: quantity })
    <$> (_.asset ~ CA.index 0 Asset.codecAsset)
    <*> (_.quantity ~ CA.index 1 codecBigInt)
  where
  codecBigInt ∷ JsonCodec BigInt
  codecBigInt =
    CA.prismaticCodec "BigInt" BigInt.fromNumber BigInt.toNumber CA.number

valueLovelace ∷ Value → BigInt
valueLovelace { assets } =
  Array.find (\{ asset } → asset == Asset.Lovelace) assets |> case _ of
    Just { quantity } → quantity
    Nothing → zero

