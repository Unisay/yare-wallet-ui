module Cardano.Value.Token.Policy
  ( Policy
  , unsafePolicy
  , parsePolicy
  , readPolicy
  , printPolicy
  , codecPolicy
  ) where

import Custom.Prelude

import Data.Array as Array
import Data.CodePoint.Unicode as CodePoint
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.String as String

newtype Policy = Policy String

derive instance eqPolicy ∷ Eq Policy

instance showPolicy ∷ Show Policy where
  show (Policy policyId) = policyId

unsafePolicy ∷ String → Policy
unsafePolicy = Policy

parsePolicy ∷ String → Either String Policy
parsePolicy policyId = do
  let codePoints = String.toCodePointArray policyId
  unless (Array.length codePoints == 56) do
    Left "Policy ID must contain 56 hexadecimal digits (0..9, A..F, a..f)"
  unless (Array.all CodePoint.isHexDigit codePoints) do
    Left "Policy ID must contain only hex digits (0..9, A..F, a..f)"
  Right (Policy policyId)

readPolicy ∷ String → Maybe Policy
readPolicy = hush <<< parsePolicy

printPolicy ∷ Policy → String
printPolicy (Policy policyId) = policyId

codecPolicy ∷ JsonCodec Policy
codecPolicy = CA.prismaticCodec "Policy" readPolicy printPolicy CA.string

