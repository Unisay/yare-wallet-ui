module Store where

import Custom.Prelude hiding ((|>))

import Cardano.Transaction (TxId)
import Cardano.Value.Asset (NativeAsset)
import Cardano.Value.Asset.MintStatus (MintStatus(..))
import Cardano.Value.Token.Name (TokenName)
import Data.Map (Map)
import Data.Map as Map
import Effect.Class (class MonadEffect)
import Halogen.Helix (HelixMiddleware, UseHelixHook, makeStore, (|>))
import Halogen.Hooks (Hook, StateId, UseState, useState)
import Yare.Capability.LogMessages (class LogMessages, logInfo)
import Yare.Capability.Resource.Assets (class Assets, mintAsset)

type State = Map TokenName MintStatus

--------------------------------------------------------------------------------
-- Actions ---------------------------------------------------------------------

data Action
  = RequestMint TokenName
  | HandleBackendEvent Event

derive instance eqAction ∷ Eq Action

instance showAction ∷ Show Action where
  show = case _ of
    RequestMint asset → "RequestMint " <> show asset
    HandleBackendEvent event → "HandleBackendEvent " <> show event

--------------------------------------------------------------------------------
-- Events ----------------------------------------------------------------------

data Event
  = EventMintRequested NativeAsset TxId
  | EventMintConfirmed NativeAsset TxId

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
  RequestMint tokenName →
    Map.insert tokenName MintRequest state
  HandleBackendEvent event →
    case event of
      EventMintRequested { policy, name } tx →
        Map.insert name (MintRequestReceived { policy, tx }) state
      EventMintConfirmed { policy, name } tx →
        Map.insert name (MintConfirmed { policy, tx }) state

--------------------------------------------------------------------------------
-- Hooks -----------------------------------------------------------------------

useAssets
  ∷ ∀ ctx m
  . MonadEffect m
  ⇒ Eq ctx
  ⇒ LogMessages m
  ⇒ Assets m
  ⇒ UseHelixHook State Action ctx m
useAssets = makeStore "assets" reduce Map.empty do
  requestMintMiddleware |> stateLogger |> actionLogger

--------------------------------------------------------------------------------
-- Middlewares -----------------------------------------------------------------

requestMintMiddleware ∷ ∀ m. Assets m ⇒ HelixMiddleware State Action m
requestMintMiddleware _ctx action next = do
  next action
  case action of
    RequestMint name →
      mintAsset name >>= case _ of
        Nothing → pass
        Just { policy, tx } →
          next $ HandleBackendEvent $ EventMintRequested { policy, name } tx
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
