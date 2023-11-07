module Main where

import Custom.Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Halogen (liftEffect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)
import Routing.Duplex (parse)
import Routing.Hash (matchesWith)
import Yare.Api.Request (BaseURL(..))
import Yare.AppM (runAppM)
import Yare.Component.Router as Router
import Yare.Data.Route (routeCodec)
import Yare.Store (LogLevel(..), Store)

main ∷ Effect Unit
main = HA.runHalogenAff do
  body ← HA.awaitBody
  let baseUrl = BaseURL "http://localhost:9999/api"
  let
    initialStore ∷ Store
    initialStore = { baseUrl, logLevel: Dev }

  rootComponent ← runAppM initialStore Router.component
  halogenIO ← runUI rootComponent unit body
  void $ liftEffect $ matchesWith (parse routeCodec) \old new →
    when (old /= Just new) $ launchAff_ do
      _response ← halogenIO.query $ H.mkTell $ Router.Navigate new
      pass
