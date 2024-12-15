module Yare.Capability.Resource.NetworkInfo
  ( class HasNetworkInfo
  , getNetworkInfo
  , NetworkInfo
  ) where

import Custom.Prelude

import Cardano.Block (BlockRef, codecBlockRef)
import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut.Record as CAR
import Halogen (HalogenM)
import Yare.Api.Endpoint as Endpoint
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)

type NetworkInfo = { lastIndexed ∷ BlockRef, networkTip ∷ BlockRef }

codecNetworkInfo ∷ JsonCodec NetworkInfo
codecNetworkInfo =
  CAR.object "NetworkInfo"
    { lastIndexed: codecBlockRef
    , networkTip: codecBlockRef
    }

class Monad m ⇐ HasNetworkInfo m where
  getNetworkInfo ∷ m (Maybe NetworkInfo)

instance HasNetworkInfo AppM where
  getNetworkInfo =
    Api.mkRequest { endpoint: Endpoint.Network, method: Get }
      >>= Api.handleResponseErrors codecNetworkInfo hush

instance HasNetworkInfo m ⇒ HasNetworkInfo (HalogenM st act slots msg m) where
  getNetworkInfo = lift <| getNetworkInfo

