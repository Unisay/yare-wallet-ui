module Yare.AppM
  ( AppM(..)
  , runAppM
  ) where

import Custom.Prelude

import Control.Monad.Reader (class MonadAsk, ReaderT, ask, runReaderT)
import Data.Newtype (class Newtype)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Console as Console
import Effect.Now as Now
import Routing.Duplex (print)
import Routing.Hash (setHash)
import Yare.Capability.LogMessages (class LogMessages)
import Yare.Capability.Navigate (class Navigate)
import Yare.Capability.Now (class Now)
import Yare.Config (LogLevel(..), Config)
import Yare.Data.Log as Log
import Yare.Data.Route as Route

newtype AppM a = AppM (ReaderT Config Aff a)

derive newtype instance functorAppM ∷ Functor AppM
derive newtype instance applyAppM ∷ Apply AppM
derive newtype instance applicativeAppM ∷ Applicative AppM
derive newtype instance bindAppM ∷ Bind AppM
derive newtype instance monadAppM ∷ Monad AppM
derive newtype instance monadEffectAppM ∷ MonadEffect AppM
derive newtype instance monadAffAppM ∷ MonadAff AppM
derive newtype instance monadAsk ∷ MonadAsk Config AppM
derive instance newtypeAppM ∷ Newtype (AppM a) _

instance nowAppM ∷ Now AppM where
  now = liftEffect Now.now
  nowDate = liftEffect Now.nowDate
  nowTime = liftEffect Now.nowTime
  nowDateTime = liftEffect Now.nowDateTime

instance logMessagesAppM ∷ LogMessages AppM where
  logMessage log = do
    { logLevel } ← ask
    liftEffect case logLevel, Log.reason log of
      Prod, Log.Debug → pure unit
      _, _ → Console.log $ Log.message log

instance navigateAppM ∷ Navigate AppM where
  navigate = liftEffect <<< setHash <<< print Route.routeCodec

runAppM ∷ Config → AppM ~> Aff
runAppM config (AppM reader) = runReaderT reader config
