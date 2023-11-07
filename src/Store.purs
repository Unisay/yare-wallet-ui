module Yare.Store where

import Custom.Prelude

import Yare.Api.Request (BaseURL)

data LogLevel = Dev | Prod

derive instance eqLogLevel ∷ Eq LogLevel
derive instance ordLogLevel ∷ Ord LogLevel

type Store =
  { logLevel ∷ LogLevel
  , baseUrl ∷ BaseURL
  }

data Action = Action

reduce ∷ Store → Action → Store
reduce store = case _ of
  Action → store
