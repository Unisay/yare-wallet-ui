module Cardano.Script where

import Custom.Prelude

import Cardano.Transaction (TxId, TxIx, codecTxId, codecTxIx)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Codec.Argonaut.Record as CAR
import Data.Codec.Argonaut.Sum as CAS
import Data.Newtype (class Newtype)

newtype ScriptHash = ScriptHash String

renderScriptHash ∷ ScriptHash → String
renderScriptHash (ScriptHash scriptHash) = scriptHash

derive instance newtypeScriptHash ∷ Newtype ScriptHash _

codecScriptHash ∷ JsonCodec ScriptHash
codecScriptHash = CA.coercible "ScriptHash" CA.string

data ScriptStatus
  = DeploymentInitiated
  | DeploymentCompleted

renderScriptStatus ∷ ScriptStatus → String
renderScriptStatus DeploymentInitiated = "deploy-initiated"
renderScriptStatus DeploymentCompleted = "deploy-completed"

codecScriptStatus ∷ JsonCodec ScriptStatus
codecScriptStatus = CAS.enumSum renderScriptStatus case _ of
  "deploy-initiated" → Just DeploymentInitiated
  "deploy-completed" → Just DeploymentCompleted
  _ → Nothing

type ScriptDeployment =
  { scriptHash ∷ ScriptHash
  , scriptStatus ∷ ScriptStatus
  , scriptTxId ∷ TxId
  , scriptTxOut ∷ TxIx
  }

codecScriptDeployment ∷ JsonCodec ScriptDeployment
codecScriptDeployment =
  CAR.object "ScriptDeployment"
    { scriptHash: codecScriptHash
    , scriptStatus: codecScriptStatus
    , scriptTxId: codecTxId
    , scriptTxOut: codecTxIx
    }
