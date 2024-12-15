module Yare.Component.Addresses (component) where

import Custom.Prelude hiding (div)

import Cardano.Address (Address)
import Component.Html.Decor as Decor
import Component.Html.Layout (layout)
import Component.Html.Sidebar (sidebar)
import Data.Array (mapWithIndex)
import Halogen (Component, ComponentHTML, HalogenM, defaultEval, mkComponent, mkEval, put)
import Halogen.HTML.Extended (css, div, p_, table, tbody_, td_, text, th_, thead_, tr_)
import Network.RemoteData (RemoteData(..))
import Yare.Capability.Resource.Addresses (class HasAddresses, getAddresses)
import Yare.Data.Route (Route(..))

data Action = Initialize

type State = RemoteData String (Array Address)

component ∷ ∀ q i o m. HasAddresses m ⇒ Component q i o m
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
  handleAction Initialize =
    getAddresses >>= case _ of
      [] → put $ Failure "No info about addresses is available"
      addresses → put $ Success addresses

  render ∷ ∀ cs. State → ComponentHTML Action cs m
  render remoteNetworkInfo = layout "addresses" (sidebar Addresses)
    [ case remoteNetworkInfo of
        NotAsked → p_ [ text "Loading..." ]
        Loading → p_ [ text "Loading..." ]
        Failure err → p_ [ text err ]
        Success addresses → renderAddresses addresses
    ]

  renderAddresses ∷ ∀ cs. Array Address → ComponentHTML Action cs m
  renderAddresses addresses =
    div [ css "content" ]
      [ table
          [ css "table" ]
          [ thead_ [ tr_ [ th_ [ text "#" ], th_ [ text "Address" ] ] ]
          , tbody_ $ addresses # mapWithIndex \index address →
              tr_
                [ td_ [ text $ show index ]
                , td_ [ Decor.address address ]
                ]
          ]
      ]

