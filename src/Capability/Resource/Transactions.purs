module Yare.Capability.Resource.Transactions where

import Custom.Prelude

import Cardano.Types (TxId, codecTxId)
import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Codec.Argonaut.Record as CAR
import Halogen (HalogenM)
import Yare.Api.Endpoint as Endpoint
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)

type Transactions =
  { submitted ∷ Array TxId
  , inLedger ∷ Array TxId
  }

codecTransactions ∷ JsonCodec Transactions
codecTransactions = CAR.object "Transactions"
  { submitted: CA.array codecTxId
  , inLedger: CA.array codecTxId
  }

class Monad m ⇐ HasTransactions m where
  getTransactions ∷ m (Maybe Transactions)

instance HasTransactions AppM where
  getTransactions = do
    mbJson ← Api.mkRequest { endpoint: Endpoint.Transactions, method: Get }
    Api.decode "Transactions" codecTransactions mbJson

instance HasTransactions m ⇒ HasTransactions (HalogenM st act slots msg m) where
  getTransactions = lift <| getTransactions
