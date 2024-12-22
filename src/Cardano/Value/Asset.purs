module Cardano.Value.Asset
  ( Asset(..)
  , nativeToken
  , codecAsset
  ) where

import Custom.Prelude

import Cardano.Value.Token.Name (TokenName, codecTokenName)
import Cardano.Value.Token.Policy (Policy, codecPolicy)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut.Record as CAR
import Data.Codec.Argonaut.Variant (variantMatch)
import Data.Profunctor (dimap)
import Data.Variant as Variant
import Type.Proxy (Proxy(..))

data Asset = Ada | NativeToken { policy ∷ Policy, name ∷ TokenName }

derive instance eqAsset ∷ Eq Asset
derive instance ordAsset ∷ Ord Asset

instance showAsset ∷ Show Asset where
  show Ada = "Ada"
  show (NativeToken nt) = show nt.policy <> "." <> show nt.name

nativeToken ∷ Policy → TokenName → Asset
nativeToken policy name = NativeToken { name, policy }

codecAsset ∷ JsonCodec Asset
codecAsset = dimap toVariant fromVariant do
  variantMatch
    { ada: Left unit
    , nativeToken: Right $
        CAR.object "Asset"
          { "policy": codecPolicy
          , "name": codecTokenName
          }
    }

  where
  toVariant =
    case _ of
      Ada → Variant.inj (Proxy @"ada") unit
      NativeToken nt → Variant.inj (Proxy @"nativeToken") nt
  fromVariant =
    Variant.match { ada: \_ → Ada, nativeToken: NativeToken }
