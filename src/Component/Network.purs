module Yare.Component.Network (component) where

import Custom.Prelude hiding (div)

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
  render remoteNetworkInfo = layout Network "network" []
    [ case remoteNetworkInfo of
        NotAsked → p_ [ text "Loading..." ]
        Loading → p_ [ text "Loading..." ]
        Failure err → p_ [ text err ]
        Success { chainTip } →
          div [ css "content" ]
            [ h2_ [ text "Network Tip" ]
            , p_
                [ text $ "Slot # " <> show chainTip.slotNo
                , br_
                , text $ "Block # " <> show chainTip.blockNo
                ]
            ]
    ]

