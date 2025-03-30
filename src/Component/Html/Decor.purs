module Component.Html.Decor where

import Prelude

import Cardano.Address (Address, renderAddress)
import Cardano.Block (BlockHash, renderBlockHash)
import Cardano.Script (ScriptHash, renderScriptHash)
import Cardano.Transaction (TxId, TxIx, renderTxId, renderTxIx)
import Data.String as String
import Halogen.HTML (HTML, a)
import Halogen.HTML.Extended (css, span, text)
import Halogen.HTML.Properties (href, title)

index ∷ ∀ w i. Int → HTML w i
index = text <<< show

block ∷ ∀ w i. BlockHash → HTML w i
block hash =
  span [ css "is-family-code" ]
    [ text ("Block hash: " <> renderBlockHash hash) ]

blockNo ∷ ∀ w i. Int → HTML w i
blockNo b =
  span [ css "is-family-code" ]
    [ text "Block # "
    , a [ href ("https://preprod.cardanoscan.io/block/" <> show b) ]
        [ text (show b) ]
    ]

slotNo ∷ ∀ w i. Int → HTML w i
slotNo slot = span [ css "is-family-code" ] [ text ("Slot # " <> show slot) ]

address ∷ ∀ w i. Address → HTML w i
address addr =
  let
    addr' = renderAddress addr
    url = "https://preprod.cardanoscan.io/address/" <> addr'
    len = String.length addr'
    label = text
      if len > 63 then
        String.take 30 addr'
          <> "..."
          <> String.drop (len - 30) addr'
      else addr'
  in
    a [ href url, title addr', css "is-family-code" ] [ label ]

txId ∷ ∀ w i. TxId → HTML w i
txId id = a
  [ href ("https://preprod.cardanoscan.io/transaction/" <> renderTxId id)
  , css "is-family-code"
  ]
  [ text (renderTxId id) ]

txIx ∷ ∀ w i. TxIx → HTML w i
txIx ix = span [ css "is-family-code" ] [ text (renderTxIx ix) ]

scriptHash ∷ ∀ w i. ScriptHash → HTML w i
scriptHash hash =
  span [ css "is-family-code" ] [ text (renderScriptHash hash) ]
