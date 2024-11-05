module Yare.Capability.Resource.Addresses where

import Custom.Prelude

import Cardano.Types (Address, codecAddress)
import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Halogen (HalogenM)
import Yare.Api.Endpoint as Endpoint
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)

type Addresses = Array Address

codecAddresses ∷ JsonCodec Addresses
codecAddresses = CA.array codecAddress

class Monad m ⇐ HasAddresses m where
  getAddresses ∷ m (Maybe Addresses)

instance HasAddresses AppM where
  getAddresses = do
    mbJson ← Api.mkRequest { endpoint: Endpoint.Addresses, method: Get }
    Api.decode "Addresses" codecAddresses mbJson

instance HasAddresses m ⇒ HasAddresses (HalogenM st act slots msg m) where
  getAddresses = lift <| getAddresses
