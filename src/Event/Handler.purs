module Event.Handler where

import Custom.Prelude

import Event (MintingInitiated(..))
import Yare.Capability.LogMessages (class LogMessages, logInfo)

onMintingInitiated ∷ ∀ m. LogMessages m ⇒ MintingInitiated → m Unit
onMintingInitiated (MintingInitiated asset) = do
  logInfo $ "Minting initiated: " <> show asset
