module Cardano.Address where

import Custom.Prelude

import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Newtype (class Newtype)

newtype Address = Address String

renderAddress ∷ Address → String
renderAddress (Address address) = address

instance Show Address where
  show (Address address) = address

derive instance newtypeAddress ∷ Newtype Address _

codecAddress ∷ JsonCodec Address
codecAddress = CA.coercible "Address" CA.string
