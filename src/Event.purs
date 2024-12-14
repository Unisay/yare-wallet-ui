module Event where

import Custom.Prelude 

import Cardano.Value.Asset (Asset)

newtype MintingInitiated = MintingInitiated Asset

instance showMintingInitiated ∷ Show MintingInitiated where
  show (MintingInitiated asset) = "MintingInitiated: " <> show asset
