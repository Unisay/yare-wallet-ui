module Main where

import Custom.Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff (launchAff_)
import Halogen (liftEffect)
import Halogen as H
import Halogen.Aff as HA
import Halogen.Component as Component
import Halogen.VDom.Driver (runUI)
import Routing.Duplex (parse)
import Routing.Hash (matchesWith)
import Yare.Api.Request (BaseURL(..))
import Yare.AppM (runAppM)
import Yare.Component.Router as Router
import Yare.Config (LogLevel(..), Config)
import Yare.Data.Route (routeCodec)

main ∷ Effect Unit
main = HA.runHalogenAff do
  body ← HA.awaitBody
  let
    baseUrl = BaseURL "http://localhost:9999/api"

    config ∷ Config
    config = { baseUrl, logLevel: Dev }

    rootComponent = Component.hoist (runAppM config) Router.component
  halogenIO ← runUI rootComponent unit body
  void $ liftEffect $ matchesWith (parse routeCodec) \old new →
    when (old /= Just new) $ launchAff_ do
      _response ← halogenIO.query $ H.mkTell $ Router.Navigate new
      pass
