module Cardano.Value.Asset
  ( Asset(..)
  , NativeAsset
  , nativeAsset
  , codecAsset
  , printAsset
  , parseAsset
  ) where

import Custom.Prelude

import Cardano.Value.Token.Name (TokenName, parseTokenNameHex, printTokenNameHex)
import Cardano.Value.Token.Policy (Policy, parsePolicy, printPolicy)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.String (Pattern(..))
import Data.String as String

type NativeAsset = { policy ∷ Policy, name ∷ TokenName }

data Asset = Lovelace | Native NativeAsset

derive instance eqAsset ∷ Eq Asset
derive instance ordAsset ∷ Ord Asset

instance showAsset ∷ Show Asset where
  show Lovelace = "Lovelace"
  show (Native asset) = "Native " <> show asset

nativeAsset ∷ Policy → TokenName → Asset
nativeAsset policy name = Native { policy, name }

codecAsset ∷ JsonCodec Asset
codecAsset = CA.prismaticCodec "Asset" parseAsset printAsset CA.string

printAsset ∷ Asset → String
printAsset = case _ of
  Lovelace → "lovelace"
  Native { policy, name } → printPolicy policy <> "." <> printTokenNameHex name

parseAsset ∷ String → Maybe Asset
parseAsset "lovelace" = Just Lovelace
parseAsset str =
  case String.split (Pattern ".") str of
    [ policy, name ] →
      hush $ nativeAsset
        <$> parsePolicy policy
        <*> parseTokenNameHex name
    _ → Nothing
