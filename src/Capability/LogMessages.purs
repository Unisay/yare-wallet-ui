module Yare.Capability.LogMessages where

import Custom.Prelude

import Yare.Capability.Now (class Now)
import Yare.Data.Log (Log, LogReason(..), mkLog)
import Control.Monad.Trans.Class (lift)
import Data.Either (Either(..))
import Data.Maybe (Maybe(..))
import Halogen (HalogenM)

class Monad m ⇐ LogMessages m where
  logMessage ∷ Log → m Unit

-- | This instance lets us avoid having to use `lift` when we use these functions in a component.
instance logMessagesHalogenM ∷ LogMessages m ⇒ LogMessages (HalogenM st act slots msg m) where
  logMessage = lift <<< logMessage

-- | Next, we'll provide a few helper functions to help users easily create and dispatch logs
-- | from anywhere in the application. Each helper composes a couple of small functions together
-- | so that we've got less to remember later on.

-- | Log a message to given a particular `LogType`
log ∷ ∀ m. LogMessages m ⇒ Now m ⇒ LogReason → String → m Unit
log reason = logMessage <=< mkLog reason

-- | Log a message for debugging purposes
logDebug ∷ ∀ m. LogMessages m ⇒ Now m ⇒ String → m Unit
logDebug = log Debug

-- | Log a message to convey non-error information
logInfo ∷ ∀ m. LogMessages m ⇒ Now m ⇒ String → m Unit
logInfo = log Info

-- | Log a message as a warning
logWarn ∷ ∀ m. LogMessages m ⇒ Now m ⇒ String → m Unit
logWarn = log Warn

-- | Log a message as an error
logError ∷ ∀ m. LogMessages m ⇒ Now m ⇒ String → m Unit
logError = log Error

-- | Hush a monadic action by logging the error, leaving it open why the error is being logged
logHush ∷ ∀ m a. LogMessages m ⇒ Now m ⇒ LogReason → m (Either String a) → m (Maybe a)
logHush reason action =
  action >>= case _ of
    Left e → case reason of
      Debug → logDebug e *> pure Nothing
      Info → logInfo e *> pure Nothing
      Warn → logWarn e *> pure Nothing
      Error → logError e *> pure Nothing
    Right v → pure $ Just v

-- | Hush a monadic action by logging the error in debug mode
debugHush ∷ ∀ m a. LogMessages m ⇒ Now m ⇒ m (Either String a) → m (Maybe a)
debugHush = logHush Debug
