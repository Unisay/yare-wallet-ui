module Cardano.Value.Asset.MintStatus where

import Custom.Prelude

import Cardano.Transaction (TxId)
import Cardano.Value.Token.Policy (Policy)

data MintStatus
  = MintRequest
  | MintRequestReceived { policy ∷ Policy, tx ∷ TxId }
  | MintConfirmed { policy ∷ Policy, tx ∷ TxId }

derive instance eqMintStatus ∷ Eq MintStatus

instance showMintStatus ∷ Show MintStatus where
  show = case _ of
    MintRequest →
      "MintRequest"
    MintRequestReceived { policy, tx } →
      "MintRequestReceived { policy: "
        <> show policy
        <> ", tx: "
        <> show tx
        <> "}"
    MintConfirmed { policy, tx } →
      "MintConfirmed { policy: "
        <> show policy
        <> ", tx: "
        <> show tx
        <> "}"

