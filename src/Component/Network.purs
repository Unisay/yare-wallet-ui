module Yare.Component.Network (component) where

import Custom.Prelude hiding (div)

import Cardano.Block (BlockRef)
import Component.Html.Decor as Decor
import Component.Html.Layout (layout)
import Halogen (Component, ComponentHTML, HalogenM, defaultEval, mkComponent, mkEval, put)
import Halogen.HTML.Extended (br_, css, div, h2_, p_, text)
import Network.RemoteData (RemoteData(..))
import Yare.Capability.Resource.NetworkInfo (class HasNetworkInfo, NetworkInfo, getNetworkInfo)
import Yare.Data.Route (Route(..))

data Action = Initialize

type State = RemoteData String NetworkInfo

component ∷ ∀ q i o m. HasNetworkInfo m ⇒ Component q i o m
component = mkComponent
  { initialState: const NotAsked
  , render
  , eval: mkEval defaultEval
      { handleAction = handleAction
      , initialize = Just Initialize
      }
  }

  where

  handleAction ∷ ∀ cs. Action → HalogenM State Action cs o m Unit
  handleAction = case _ of
    Initialize → getNetworkInfo >>= case _ of
      Nothing → put $ Failure "No network info available"
      Just networkInfo → put $ Success networkInfo

  render ∷ ∀ cs. State → ComponentHTML Action cs m
  render remoteNetworkInfo =
    layout Network "network" []
      [ case remoteNetworkInfo of
          NotAsked → p_ [ text "Loading..." ]
          Loading → p_ [ text "Loading..." ]
          Failure err → p_ [ text err ]
          Success { lastIndexed, networkTip } → do
            let
              progress ∷ Int
              progress = lastIndexed.blockNo * 100 / networkTip.blockNo
            div [ css "content" ]
              [ h2_ [ text "Network Tip" ]
              , renderBlockRef networkTip
              , h2_ [ text "Last Indexed" ]
              , renderBlockRef lastIndexed
              , h2_ [ text "Sync Progress" ]
              , p_
                  [ text case progress of
                      100 → "Fully synchronized"
                      percentage → "Syncing, " <> show percentage <> "%"
                  ]
              ]
      ]

  renderBlockRef ∷ ∀ cs. BlockRef → ComponentHTML Action cs m
  renderBlockRef { slotNo, blockNo, headerHash } =
    p_
      [ Decor.slotNo slotNo
      , br_
      , Decor.blockNo blockNo
      , br_
      , Decor.block headerHash
      ]

