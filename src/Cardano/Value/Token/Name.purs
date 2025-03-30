module Cardano.Value.Token.Name
  ( TokenName
  , parseTokenName
  , readTokenName
  , printTokenName
  , codecTokenName
  , parseTokenNameHex
  , readTokenNameHex
  , printTokenNameHex
  , codecTokenNameHex
  , unsafeTokenName
  ) where

import Custom.Prelude

import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.String as String
import Data.String.Base16 (base16Decode, base16Encode)

newtype TokenName = TokenName String

derive instance eqTokenName ∷ Eq TokenName
derive instance ordTokenName ∷ Ord TokenName

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

--------------------------------------------------------------------------------
-- Hexadecimal representation --------------------------------------------------

parseTokenNameHex ∷ String → Either String TokenName
parseTokenNameHex = map TokenName <<< base16Decode

readTokenNameHex ∷ String → Maybe TokenName
readTokenNameHex = hush <<< parseTokenNameHex

printTokenNameHex ∷ TokenName → String
printTokenNameHex (TokenName tokenName) = base16Encode tokenName

codecTokenNameHex ∷ JsonCodec TokenName
codecTokenNameHex =
  CA.prismaticCodec "TokenName" readTokenNameHex printTokenNameHex CA.string
