module Yare.Component.Scripts (component) where

import Custom.Prelude hiding (div)

import Cardano.Types (ScriptDeployment, ScriptStatus(..))
import Component.Html.Decor as Decor
import Component.Html.Layout (layout)
import Data.Array (mapWithIndex)
import Halogen (Component, ComponentHTML, HalogenM, defaultEval, mkComponent, mkEval, put)
import Halogen.HTML.Extended (css, div, p_, span, table, tbody_, td_, text, th_, thead_, tr_)
import Network.RemoteData (RemoteData(..))
import Yare.Capability.Resource.Scripts (class HasScripts, Scripts, getScripts)
import Yare.Data.Route (Route(..))

data Action = Initialize

type State = RemoteData String (Array ScriptDeployment)

component ∷ ∀ q i o m. HasScripts m ⇒ Component q i o m
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
    Initialize → getScripts >>= case _ of
      Nothing → put $ Failure "No info about Scripts is available"
      Just scripts → put $ Success scripts

  render ∷ ∀ cs. State → ComponentHTML Action cs m
  render remoteNetworkInfo = layout Scripts "Scripts" []
    [ case remoteNetworkInfo of
        NotAsked → p_ [ text "Loading..." ]
        Loading → p_ [ text "Loading..." ]
        Failure err → p_ [ text err ]
        Success scripts → renderScripts scripts
    ]

  renderScripts ∷ ∀ cs. Scripts → ComponentHTML Action cs m
  renderScripts scripts =
    div [ css "content" ]
      [ table
          [ css "table" ]
          [ thead_
              [ tr_
                  [ th_ [ text "#" ]
                  , th_ [ text "ScriptHash" ]
                  , th_ [ text "Status" ]
                  , th_ [ text "Tx" ]
                  , th_ [ text "Out" ]
                  ]
              ]
          , tbody_ $ scripts # mapWithIndex \index script →
              tr_
                [ td_ [ Decor.index index ]
                , td_ [ Decor.scriptHash script.scriptHash ]
                , td_ [ renderScriptStatus script.scriptStatus ]
                , td_ [ Decor.txId script.scriptTxId ]
                , td_ [ Decor.txIx script.scriptTxOut ]
                ]
          ]
      ]

  renderScriptStatus ∷ ∀ cs. ScriptStatus → ComponentHTML Action cs m
  renderScriptStatus status = span [ css "is-family-code" ]
    case status of
      DeploymentInitiated → [ text "Deployment Initiated" ]
      DeploymentCompleted → [ text "Deployment Completed" ]
