module Yare.Component.UTxO (component) where

import Custom.Prelude hiding (div)

import Cardano.Types (valueLovelace)
import Component.Html.Layout (layout)
import Data.Array (mapWithIndex)
import Data.Traversable (traverse)
import Halogen as H
import Halogen.HTML.Elements (table, tbody_, thead_)
import Halogen.HTML.Extended (css, div, div_, noHtml, p_, span, td, td_, text, th, th_, tr_)
import Network.RemoteData (RemoteData(..))
import Yare.Capability.Resource.UTxO (class HasUTxO, UTxOs, getUTxO)
import Yare.Data.Route (Route(..))

data Action = Initialize

type State = RemoteData String UTxOs

component ∷ ∀ q i o m. HasUTxO m ⇒ H.Component q i o m
component = H.mkComponent
  { initialState: const NotAsked
  , render
  , eval: H.mkEval H.defaultEval
      { handleAction = handleAction
      , initialize = Just Initialize
      }
  }

  where

  handleAction ∷ ∀ cs. Action → H.HalogenM State Action cs o m Unit
  handleAction = case _ of
    Initialize → getUTxO >>= case _ of
      Nothing → H.put $ Failure "No network info available"
      Just utxo → H.put $ Success utxo

  render ∷ ∀ cs. State → H.ComponentHTML Action cs m
  render remoteUTxO = layout Network "network" []
    [ case remoteUTxO of
        NotAsked → p_ [ text "Loading..." ]
        Loading → p_ [ text "Loading..." ]
        Failure err → p_ [ text err ]
        Success utxos → renderUtxo utxos
    ]

  renderUtxo ∷ ∀ cs. UTxOs → H.ComponentHTML Action cs m
  renderUtxo utxos =
    table [ css "table" ]
      [ thead_
          [ tr_
              [ th_ [ text "#" ]
              , th_ [ text "Address" ]
              , th_ [ text "Value" ]
              ]
          ]
      , tbody_ $ utxos # mapWithIndex \index { address, value } →
          tr_
            let
              cellClass = "is-size-7 is-family-code"
            in
              [ th [ css cellClass ] [ text (show index) ]
              , td [ css cellClass ] [ text $ show address ]
              , td [ css cellClass ] [ text $ show $ valueLovelace value ]
              ]

      ]
