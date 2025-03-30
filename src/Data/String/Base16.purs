module Data.String.Base16 (base16Encode, base16Decode) where

import Custom.Prelude

import Data.Function.Uncurried (Fn3, runFn3)

foreign import base16Encode ∷ String → String

type Error = String

base16Decode ∷ String → Either Error String
base16Decode str = runFn3 base16Decode_ str Left Right

foreign import base16Decode_ ∷ ∀ a. Fn3 String (Error → a) (String → a) a

