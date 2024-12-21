module Store where

import Custom.Prelude hiding ((|>))

import Cardano.Value.Asset (Asset)
import Cardano.Value.Asset.MintStatus (MintStatus(..))
import Data.Map (Map)
import Data.Map as Map
import Effect.Class (class MonadEffect)
import Halogen.Helix (HelixMiddleware, UseHelixHook, makeStore, (|>))
import Halogen.Hooks (Hook, StateId, UseState, useState)
import Yare.Capability.LogMessages (class LogMessages, logInfo)

type State = Map Asset MintStatus

data Action = RequestMint Asset | ConfirmMint Asset

derive instance eqAction ∷ Eq Action

instance showAction ∷ Show Action where
  show = case _ of
    RequestMint asset → "RequestMint " <> show asset
    ConfirmMint asset → "ConfirmMint " <> show asset

reduce ∷ State → Action → State
reduce state action = case action of
  RequestMint asset → Map.insert asset MintRequested state
  ConfirmMint asset → Map.insert asset Minted state

useAssets
  ∷ ∀ ctx m
  . MonadEffect m
  ⇒ Eq ctx
  ⇒ LogMessages m
  ⇒ UseHelixHook State Action ctx m
useAssets = makeStore "assets" reduce Map.empty middleware

--------------------------------------------------------------------------------
-- Middlewares -----------------------------------------------------------------

middleware ∷ ∀ m. LogMessages m ⇒ HelixMiddleware State Action m
middleware = stateLogger |> actionLogger

actionLogger ∷ ∀ m. LogMessages m ⇒ HelixMiddleware State Action m
actionLogger _ctx action next = do
  logInfo $ "Action dispatched: " <> show action
  next action

stateLogger ∷ ∀ m. LogMessages m ⇒ HelixMiddleware State Action m
stateLogger ctx action next = do
  ctx.getState >>= show >>> ("Before state: " <> _) >>> logInfo
  next action
  ctx.getState >>= show >>> ("After state: " <> _) >>> logInfo

--------------------------------------------------------------------------------
-- Utils -----------------------------------------------------------------------

useStateFn
  ∷ ∀ state m a
  . (StateId state → a)
  → state
  → Hook m (UseState state) (state /\ a)
useStateFn f initial = f <<$>> useState initial
