module Cardano.Transaction where

import Custom.Prelude

import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Int as Int
import Data.Newtype (class Newtype)
import Data.String (Pattern(..))
import Data.String as String

--------------------------------------------------------------------------------
-- Transaction Input -----------------------------------------------------------

newtype TxIn = TxIn String

renderTxIn ∷ TxIn → String
renderTxIn (TxIn txIn) = txIn

derive newtype instance eqTxIn ∷ Eq TxIn
derive instance newtypeTxIn ∷ Newtype TxIn _
instance Show TxIn where
  show = renderTxIn

codecTxIn ∷ JsonCodec TxIn
codecTxIn = CA.coercible "TxIn" CA.string

splitTxIn ∷ TxIn → { txId ∷ TxId, txIx ∷ Int }
splitTxIn (TxIn txIn) =
  let
    { before: txId, after: txIx } = String.splitAt 64 txIn
  in
    { txId: TxId txId
    , txIx: case Int.fromString =<< String.stripPrefix (Pattern "#") txIx of
        Nothing → -1
        Just ix → ix
    }

--------------------------------------------------------------------------------
-- Transaction Id 0000----------------------------------------------------------

newtype TxId = TxId String

renderTxId ∷ TxId → String
renderTxId (TxId txId) = txId

derive newtype instance eqTxId ∷ Eq TxId
derive instance newtypeTxId ∷ Newtype TxId _
instance Show TxId where
  show = renderTxId

codecTxId ∷ JsonCodec TxId
codecTxId = CA.coercible "TxId" CA.string

--------------------------------------------------------------------------------
-- Transaction Index -----------------------------------------------------------

newtype TxIx = TxIx Int

renderTxIx ∷ TxIx → String
renderTxIx (TxIx txIx) = show txIx

derive newtype instance eqTxIx ∷ Eq TxIx
derive instance newtypeTxIx ∷ Newtype TxIx _
instance Show TxIx where
  show = renderTxIx

codecTxIx ∷ JsonCodec TxIx
codecTxIx = CA.coercible "TxIx" CA.int
