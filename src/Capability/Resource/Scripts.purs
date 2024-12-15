module Yare.Capability.Resource.Scripts where

import Custom.Prelude

import Cardano.Script (ScriptDeployment, codecScriptDeployment)
import Control.Monad.Trans.Class (lift)
import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Halogen (HalogenM)
import Yare.Api.Endpoint as Endpoint
import Yare.Api.Request (RequestMethod(..))
import Yare.Api.Utils as Api
import Yare.AppM (AppM)

type Scripts = Array ScriptDeployment

codecScripts ∷ JsonCodec Scripts
codecScripts = CA.array codecScriptDeployment

class Monad m ⇐ HasScripts m where
  getScripts ∷ m (Maybe Scripts)

instance HasScripts AppM where
  getScripts =
    Api.mkRequest { endpoint: Endpoint.Scripts, method: Get } >>=
      Api.handleResponseErrors codecScripts hush

instance HasScripts m ⇒ HasScripts (HalogenM st act slots msg m) where
  getScripts = lift <| getScripts
