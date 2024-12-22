module Store where

import Custom.Prelude hiding ((|>))

import Cardano.Transaction (TxId)
import Cardano.Value.Asset (Asset)
import Cardano.Value.Asset.MintStatus (MintStatus(..))
import Data.Map (Map)
import Data.Map as Map
import Effect.Class (class MonadEffect)
import Halogen.Helix (HelixMiddleware, UseHelixHook, makeStore, (|>))
import Halogen.Hooks (Hook, StateId, UseState, useState)
import Yare.Capability.LogMessages (class LogMessages, logInfo)
import Yare.Capability.Resource.Minting (class Minting, mintAsset)

type State = Map Asset MintStatus

--------------------------------------------------------------------------------
-- Actions ---------------------------------------------------------------------

data Action
  = RequestMint Asset
  | HandleBackendEvent Event

derive instance eqAction ∷ Eq Action

instance showAction ∷ Show Action where
  show = case _ of
    RequestMint asset → "RequestMint " <> show asset
    HandleBackendEvent event → "HandleBackendEvent " <> show event

--------------------------------------------------------------------------------
-- Events ----------------------------------------------------------------------

data Event
  = EventMintRequested Asset TxId
  | EventMintConfirmed Asset TxId

derive instance eqEvent ∷ Eq Event
instance showEvent ∷ Show Event where
  show = case _ of
    EventMintRequested asset txId →
      "EventMintRequested " <> show asset <> " " <> show txId
    EventMintConfirmed asset txId →
      "EventMintConfirmed " <> show asset <> " " <> show txId

--------------------------------------------------------------------------------
-- Reducer ---------------------------------------------------------------------

reduce ∷ State → Action → State
reduce state = case _ of
  RequestMint asset → Map.insert asset (MintRequested Nothing) state
  HandleBackendEvent event →
    case event of
      EventMintRequested asset txId →
        Map.insert asset (MintRequested (Just txId)) state
      EventMintConfirmed asset txId →
        Map.insert asset (MintConfirmed txId) state

--------------------------------------------------------------------------------
-- Hooks -----------------------------------------------------------------------

useAssets
  ∷ ∀ ctx m
  . MonadEffect m
  ⇒ Eq ctx
  ⇒ LogMessages m
  ⇒ Minting m
  ⇒ UseHelixHook State Action ctx m
useAssets = makeStore "assets" reduce Map.empty do
  requestMintMiddleware |> stateLogger |> actionLogger

--------------------------------------------------------------------------------
-- Middlewares -----------------------------------------------------------------

requestMintMiddleware ∷ ∀ m. Minting m ⇒ HelixMiddleware State Action m
requestMintMiddleware _ctx action next = do
  next action
  case action of
    RequestMint asset →
      mintAsset asset >>= case _ of
        Just txId → next (HandleBackendEvent (EventMintRequested asset txId))
        Nothing → pass
    _ → pass

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
