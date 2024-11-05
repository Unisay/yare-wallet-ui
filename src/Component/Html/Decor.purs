module Component.Html.Decor where

import Prelude

import Cardano.Types (Address, TxId)
import Halogen.HTML (HTML, a)
import Halogen.HTML.Extended (css, text)
import Halogen.HTML.Properties (href)

address ∷ ∀ w i. Address → HTML w i
address addr = a
  [ href ("https://preprod.cardanoscan.io/address/" <> show addr)
  , css "is-family-code"
  ]
  [ text (show addr) ]

txId ∷ ∀ w i. TxId → HTML w i
txId id = a
  [ href ("https://preprod.cardanoscan.io/transaction/" <> show id)
  , css "is-family-code"
  ]
  [ text (show id) ]
