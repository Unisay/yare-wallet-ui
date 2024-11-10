module Component.Html.Decor where

import Prelude

import Cardano.Types (Address, ScriptHash(..), TxId, TxIx(..))
import Halogen.HTML (HTML, a)
import Halogen.HTML.Extended (css, span, text)
import Halogen.HTML.Properties (href)

index ∷ ∀ w i. Int → HTML w i
index = text <<< show

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

txIx ∷ ∀ w i. TxIx → HTML w i
txIx (TxIx ix) = span [ css "is-family-code" ] [ text (show ix) ]

scriptHash ∷ ∀ w i. ScriptHash → HTML w i
scriptHash (ScriptHash hash) =
  span [ css "is-family-code" ] [ text hash ]
