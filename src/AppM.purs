module Yare.AppM
  ( AppM(..)
  , Sender(..)
  , Subscriber(..)
  , Topic(..)
  , TopicId
  , createTopic
  , runAppM
  )
  where

import Custom.Prelude

import Data.Array as Array
import Control.Monad.Reader (class MonadAsk)
import Effect (Effect)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Console as Console
import Effect.Now as Now
import Halogen as H
import Halogen.Store.Monad (class MonadStore, StoreT, getStore, runStoreT)
import Routing.Duplex (print)
import Routing.Hash (setHash)
import Safe.Coerce (coerce)
import Yare.Capability.LogMessages (class LogMessages)
import Yare.Capability.Navigate (class Navigate)
import Yare.Capability.Now (class Now)
import Yare.Data.Log as Log
import Yare.Data.Route as Route
import Yare.Store (Action, LogLevel(..), AppState)
import Yare.Store as Store

newtype AppM a = AppM (StoreT Store.Action Store.AppState Aff a)

runAppM ∷ ∀ q i o. Store.AppState → H.Component q i o AppM → Aff (H.Component q i o Aff)
runAppM store = runStoreT store Store.reduce <<< coerce

derive newtype instance functorAppM ∷ Functor AppM
derive newtype instance applyAppM ∷ Apply AppM
derive newtype instance applicativeAppM ∷ Applicative AppM
derive newtype instance bindAppM ∷ Bind AppM
derive newtype instance monadAppM ∷ Monad AppM
derive newtype instance monadEffectAppM ∷ MonadEffect AppM
derive newtype instance monadAffAppM ∷ MonadAff AppM
derive newtype instance monadStoreAppM ∷ MonadStore Action AppState AppM

instance nowAppM ∷ Now AppM where
  now = liftEffect Now.now
  nowDate = liftEffect Now.nowDate
  nowTime = liftEffect Now.nowTime
  nowDateTime = liftEffect Now.nowDateTime

instance logMessagesAppM ∷ LogMessages AppM where
  logMessage log = do
    { logLevel } ← getStore
    liftEffect case logLevel, Log.reason log of
      Prod, Log.Debug → pure unit
      _, _ → Console.log $ Log.message log

instance navigateAppM ∷ Navigate AppM where
  navigate = liftEffect <<< setHash <<< print Route.routeCodec

--------------------------------------------------------------------------------
-- Subscriptions ---------------------------------------------------------------

type TopicId = String

createTopic
  ∷ ∀ a
  . TopicId
  → AppM
      { sender ∷ Sender a
      , topic ∷ Topic a
      }

createTopic topicId = do
  let topic = Topic topicId
  
  pure { sender: Sender topic, topic }

newtype Sender a = Sender (Topic a)

newtype Topic a = Topic TopicId

newtype Subscriber a = Subscriber (a → AppM Unit)

{- 

                                                subscriber1 
                                               /
  sender ------------------------> topic (id) /--- subscriber 2
                                              \
                                               \ subscriber 3

-}
