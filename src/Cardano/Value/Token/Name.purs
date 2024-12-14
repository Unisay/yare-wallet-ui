module Cardano.Value.Token.Name
  ( TokenName
  , parseTokenName
  , readTokenName
  , printTokenName
  , codecTokenName
  , unsafeTokenName
  ) where

import Custom.Prelude

import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.String as String

newtype TokenName = TokenName String

derive instance eqTokenName ∷ Eq TokenName

instance showTokenName ∷ Show TokenName where
  show (TokenName tokenName) = tokenName

unsafeTokenName ∷ String → TokenName
unsafeTokenName = TokenName

parseTokenName ∷ String → Either String TokenName
parseTokenName tokenName = do
  unless (not (String.null tokenName)) do
    Left "Token Name must not be empty"
  Right (TokenName tokenName)

readTokenName ∷ String → Maybe TokenName
readTokenName = hush <<< parseTokenName

printTokenName ∷ TokenName → String
printTokenName (TokenName tokenName) = tokenName

codecTokenName ∷ JsonCodec TokenName
codecTokenName =
  CA.prismaticCodec "TokenName" readTokenName printTokenName CA.string
