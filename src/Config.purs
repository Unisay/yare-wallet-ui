module Yare.Config where

import Custom.Prelude

import Yare.Api.Request (BaseURL)

data LogLevel = Dev | Prod

derive instance eqLogLevel ∷ Eq LogLevel
derive instance ordLogLevel ∷ Ord LogLevel

type Config =
  { logLevel ∷ LogLevel
  , baseUrl ∷ BaseURL
  }

