module Capability.Resource.CanMint where

import Custom.Prelude

import Cardano.Transaction (TxId, codecTxId)
import Cardano.Value.Asset (Asset, codecAsset)
import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut as CA
import Halogen (HalogenM)
import Yare.Api.Endpoint (Endpoint(..))
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)

class Monad m ⇐ CanMint m where
  mintAsset ∷ Asset → m (Maybe TxId)

instance CanMint AppM where
  mintAsset asset =
    Api.mkRequest
      { endpoint: NftMint
      , method: Post (Just (CA.encode codecAsset asset))
      }
      >>= Api.handleResponseErrors codecTxId hush

instance CanMint m ⇒ CanMint (HalogenM st act slots msg m) where
  mintAsset = lift <<< mintAsset

