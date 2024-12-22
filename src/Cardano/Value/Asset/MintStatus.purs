module Cardano.Value.Asset.MintStatus where

import Custom.Prelude

import Cardano.Transaction (TxId)

data MintStatus = MintRequested (Maybe TxId) | MintConfirmed TxId

derive instance eqMintStatus ∷ Eq MintStatus

instance showMintStatus ∷ Show MintStatus where
  show = case _ of
    MintRequested Nothing → "MintRequested"
    MintRequested (Just txId) → "MintRequested (" <> show txId <> ")"
    MintConfirmed txId → "Minted (" <> show txId <> ")"
