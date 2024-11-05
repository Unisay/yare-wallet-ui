module Yare.Component.Router where

import Custom.Prelude

import Data.Either (hush)
import Data.Maybe (Maybe(..), fromMaybe)
import Effect.Aff.Class (class MonadAff)
import Halogen (liftEffect)
import Halogen as H
import Halogen.HTML as HH
import Halogen.Store.Monad (class MonadStore)
import Routing.Duplex as RD
import Routing.Hash (getHash)
import Type.Proxy (Proxy(..))
import Yare.Capability.LogMessages (class LogMessages)
import Yare.Capability.Navigate (class Navigate, navigate)
import Yare.Capability.Now (class Now)
import Yare.Capability.Resource.Addresses (class HasAddresses)
import Yare.Capability.Resource.NetworkInfo (class HasNetworkInfo)
import Yare.Capability.Resource.Transactions (class HasTransactions)
import Yare.Capability.Resource.UTxO (class HasUTxO)
import Yare.Component.Addresses as Addresses
import Yare.Component.Home as Home
import Yare.Component.Network as Network
import Yare.Component.Transactions as Transactions
import Yare.Component.UTxO as UTxO
import Yare.Component.Utils (OpaqueSlot)
import Yare.Data.Route (Route, routeCodec)
import Yare.Data.Route as Route
import Yare.Store as Store

data Query a = Navigate Route a

type State = { route ∷ Maybe Route }

data Action = Initialize

type ChildSlots =
  ( home ∷ OpaqueSlot Unit
  , utxo ∷ OpaqueSlot Unit
  , network ∷ OpaqueSlot Unit
  , transactions ∷ OpaqueSlot Unit
  , addresses ∷ OpaqueSlot Unit
  )

component
  ∷ ∀ m
  . MonadAff m
  ⇒ MonadStore Store.Action Store.Store m
  ⇒ Now m
  ⇒ LogMessages m
  ⇒ HasNetworkInfo m
  ⇒ HasTransactions m
  ⇒ HasAddresses m
  ⇒ HasUTxO m
  ⇒ Navigate m
  ⇒ H.Component Query Unit Void m
component = H.mkComponent
  { initialState: \_input → { route: Nothing }
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleQuery = handleQuery
      , handleAction = handleAction
      , initialize = Just Initialize
      }
  }
  where
  handleAction ∷ Action → H.HalogenM State Action ChildSlots Void m Unit
  handleAction = case _ of
    Initialize → do
      initialRoute ← hush <<< (RD.parse routeCodec) <$> liftEffect getHash
      navigate $ fromMaybe Route.Home initialRoute

  handleQuery ∷ ∀ a. Query a → H.HalogenM State Action ChildSlots Void m (Maybe a)
  handleQuery = case _ of
    Navigate dest a → do
      { route } ← H.get
      when (route /= Just dest) do
        H.modify_ _ { route = Just dest }
      pure (Just a)

  render ∷ State → H.ComponentHTML Action ChildSlots m
  render { route } = case route of
    Just r → case r of
      Route.Home →
        HH.slot_ (Proxy @"home") unit Home.component unit
      Route.UTxO →
        HH.slot_ (Proxy @"utxo") unit UTxO.component unit
      Route.Transactions →
        HH.slot_ (Proxy @"transactions") unit Transactions.component unit
      Route.Network →
        HH.slot_ (Proxy @"network") unit Network.component unit
      Route.Addresses →
        HH.slot_ (Proxy @"addresses") unit Addresses.component unit
    Nothing →
      HH.div_ [ HH.text "Oh no! That page wasn't found." ]
