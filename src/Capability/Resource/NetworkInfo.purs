module Yare.Capability.Resource.NetworkInfo
  ( class HasNetworkInfo
  , getNetworkInfo
  , NetworkInfo
  , ChainTip
  ) where

import Custom.Prelude

import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut as CA
import Data.Codec.Argonaut.Record as CAR
import Halogen (HalogenM)
import Yare.Api.Endpoint as Endpoint
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)

type ChainTip =
  { slotNo ∷ Int
  , headerHash ∷ String
  , blockNo ∷ Int
  }

type NetworkInfo = { chainTip ∷ ChainTip }

class Monad m ⇐ HasNetworkInfo m where
  getNetworkInfo ∷ m (Maybe NetworkInfo)

instance HasNetworkInfo AppM where
  getNetworkInfo = do
    mbJson ← Api.mkRequest { endpoint: Endpoint.ChainTip, method: Get }
    map { chainTip: _ } <$> Api.decode "NetworkInfo"
      ( CAR.object "ChainTip"
          { slotNo: CA.int
          , headerHash: CA.string
          , blockNo: CA.int
          }
      )
      mbJson

instance HasNetworkInfo m ⇒ HasNetworkInfo (HalogenM st act slots msg m) where
  getNetworkInfo = lift <| getNetworkInfo

