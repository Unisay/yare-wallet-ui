module Event.Handler where

import Custom.Prelude

import Event (MintingInitiated(..))
import Yare.Capability.LogMessages (class LogMessages, logInfo)
import Yare.Capability.Resource.Minting (class Minting)

onMintingInitiated
  ∷ ∀ m
  . LogMessages m
  ⇒ Minting m
  ⇒ MintingInitiated
  → m Unit
onMintingInitiated (MintingInitiated asset) = do
  logInfo $ "Minting initiated: " <> show asset
