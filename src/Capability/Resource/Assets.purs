module Yare.Capability.Resource.Assets
  ( class Assets
  , mintAsset
  ) where

import Custom.Prelude

import Cardano.Transaction (TxId, codecTxId)
import Cardano.Value.Token.Name (TokenName, codecTokenName)
import Cardano.Value.Token.Policy (Policy, codecPolicy)
import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Codec.Argonaut.Record as CAR
import Halogen (HalogenM)
import Halogen.Hooks (HookM)
import Yare.Api.Endpoint (Endpoint(..))
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)

class Monad m ⇐ Assets m where
  mintAsset ∷ TokenName → m (Maybe { policy ∷ Policy, tx ∷ TxId })

instance Assets AppM where
  mintAsset tokenName =
    Api.mkRequest
      { endpoint: Assets tokenName
      , method: Post (Just (CA.encode codecTokenName tokenName))
      }
      >>= Api.handleResponseErrors codecAssetMint hush

instance Assets m ⇒ Assets (HalogenM st act slots msg m) where
  mintAsset = lift <<< mintAsset

instance Assets m ⇒ Assets (HookM m) where
  mintAsset = lift <<< mintAsset

codecAssetMint ∷ JsonCodec { policy ∷ Policy, tx ∷ TxId }
codecAssetMint = CAR.object "AssetMint" { policy: codecPolicy, tx: codecTxId }
