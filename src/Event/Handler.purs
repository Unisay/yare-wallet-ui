module Event.Handler where

import Custom.Prelude

import Event (MintingInitiated(..))
import Yare.Capability.LogMessages (class LogMessages, logInfo)
import Yare.Capability.Now (class Now)

onMintingInitiated ∷ ∀ m. LogMessages m ⇒ Now m ⇒ MintingInitiated → m Unit
onMintingInitiated (MintingInitiated asset) = do
  logInfo $ "Minting initiated: " <> show asset
