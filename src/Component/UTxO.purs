module Yare.Component.UTxO (component) where

import Custom.Prelude hiding (div)

import Cardano.Types (splitTxIn, valueLovelace)
import Component.Html.Decor as Decor
import Component.Html.Layout (layout)
import Component.Html.Sidebar (sidebar)
import Data.Array (mapWithIndex)
import Halogen as H
import Halogen.HTML.Elements (table, tbody_, thead_)
import Halogen.HTML.Extended (css, p_, td, text, th_, tr_)
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
  handleAction Initialize =
    getUTxO >>= case _ of
      Nothing → H.put $ Failure "No UTxO info available"
      Just utxo → H.put $ Success utxo

  render ∷ ∀ cs. State → H.ComponentHTML Action cs m
  render remoteUTxO = layout "UTxO" (sidebar UTxO)
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
              , th_ [ text "Tx Id" ]
              , th_ [ text "Output Index" ]
              , th_ [ text "Value" ]
              ]
          ]
      , tbody_ $ utxos # mapWithIndex \index { address, txIn, value } →
          tr_
            let
              cellClass = "is-family-code"
              { txId, txIx } = splitTxIn txIn
            in
              [ td [ css cellClass ] [ text (show index) ]
              , td [ css cellClass ] [ Decor.address address ]
              , td [ css cellClass ] [ Decor.txId txId ]
              , td [ css cellClass ] [ text (show txIx) ]
              , td [ css cellClass ] [ text (show (valueLovelace value)) ]
              ]

      ]

