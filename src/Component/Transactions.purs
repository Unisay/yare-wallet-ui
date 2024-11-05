module Yare.Component.Transactions (component) where

import Custom.Prelude hiding (div)

import Cardano.Types (TxId)
import Component.Html.Decor as Decor
import Component.Html.Layout (layout)
import Data.Array (mapWithIndex)
import Data.Array as Array
import Halogen (Component, ComponentHTML, HalogenM, defaultEval, mkComponent, mkEval, put)
import Halogen.HTML.Extended (css, div, p_, table, tbody_, td_, text, th_, thead_, tr_)
import Network.RemoteData (RemoteData(..))
import Yare.Capability.Resource.Transactions (class HasTransactions, Transactions, getTransactions)
import Yare.Data.Route (Route(..))

data Action = Initialize

type State = RemoteData String Transactions

component ∷ ∀ q i o m. HasTransactions m ⇒ Component q i o m
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
    Initialize → getTransactions >>= case _ of
      Nothing → put $ Failure "No info about transactions is available"
      Just transactions → put $ Success transactions

  render ∷ ∀ cs. State → ComponentHTML Action cs m
  render remoteNetworkInfo = layout Transactions "transactions" []
    [ case remoteNetworkInfo of
        NotAsked → p_ [ text "Loading..." ]
        Loading → p_ [ text "Loading..." ]
        Failure err → p_ [ text err ]
        Success transactions → renderTransactions transactions
    ]

  renderTransactions ∷ ∀ cs. Transactions → ComponentHTML Action cs m
  renderTransactions { submitted, inLedger } =
    div [ css "content" ]
      [ renderSubmitted submitted
      , renderInLedger inLedger
      ]

  renderSubmitted ∷ ∀ cs. Array TxId → ComponentHTML Action cs m
  renderSubmitted submitted | Array.null submitted =
    p_ [ text "No transactions have been submitted yet." ]
  renderSubmitted submitted =
    table
      [ css "table" ]
      [ thead_
          [ tr_
              [ th_ [ text "#" ]
              , th_ [ text "Submitted" ]
              ]
          ]
      , tbody_ $ submitted # mapWithIndex \index txId →
          tr_
            [ td_ [ text $ show index ]
            , td_ [ text $ show txId ]
            ]
      ]

  renderInLedger ∷ ∀ cs. Array TxId → ComponentHTML Action cs m
  renderInLedger inLedger =
    table
      [ css "table" ]
      [ thead_
          [ tr_
              [ th_ [ text "#" ]
              , th_ [ text "In Ledger" ]
              ]
          ]
      , tbody_ $ inLedger # mapWithIndex \index txId →
          tr_
            [ td_ [ text $ show index ]
            , td_ [ Decor.txId txId ]
            ]
      ]

