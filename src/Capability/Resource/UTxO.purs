module Yare.Capability.Resource.UTxO where

import Custom.Prelude

import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Codec.Argonaut.Record as CAR
import Halogen (HalogenM)
import Yare.Api.Endpoint (Endpoint(..))
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)
import Cardano.Types (Address, TxIn, Value, codecAddress, codecTxIn, codecValue)

type UTxOs = Array UTxO

type UTxO =
  { txIn ∷ TxIn
  , address ∷ Address
  , value ∷ Value
  }

codecUtxo ∷ JsonCodec UTxO
codecUtxo = CAR.object "UTxO"
  { address: codecAddress
  , txIn: codecTxIn
  , value: codecValue
  }

class Monad m ⇐ HasUTxO m where
  getUTxO ∷ m (Maybe UTxOs)

instance HasUTxO AppM where
  getUTxO = do
    mbJson ← Api.mkRequest { endpoint: Utxo, method: Get }
    Api.decode "UTxO" (CA.array codecUtxo) mbJson

instance HasUTxO m ⇒ HasUTxO (HalogenM st act slots msg m) where
  getUTxO = lift <| getUTxO
