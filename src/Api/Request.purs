module Yare.Api.Request
  ( BaseURL(..)
  , RequestMethod(..)
  , defaultRequest
  , RequestOptions(..)
  ) where

import Custom.Prelude

import Affjax as AJ
import Affjax.RequestBody as RB
import Affjax.ResponseFormat as RF
import Data.Argonaut.Core (Json)
import Data.HTTP.Method (Method(..))
import Routing.Duplex as RD
import Yare.Api.Endpoint (Endpoint, endpointCodec)

newtype BaseURL = BaseURL String

data RequestMethod
  = Get
  | Post (Maybe Json)
  | Put (Maybe Json)
  | Delete

type RequestOptions =
  { endpoint ∷ Endpoint
  , method ∷ RequestMethod
  }

defaultRequest ∷ BaseURL → RequestOptions → AJ.Request Json
defaultRequest (BaseURL baseUrl) { endpoint, method } =
  { method: Left requestMethod
  , url: baseUrl <> RD.print endpointCodec endpoint
  , headers: []
  , content: RB.json <$> body
  , username: Nothing
  , password: Nothing
  , timeout: Nothing
  , withCredentials: false
  , responseFormat: RF.json
  }
  where
  Tuple requestMethod body = case method of
    Get → Tuple GET Nothing
    Post b → Tuple POST b
    Put b → Tuple PUT b
    Delete → Tuple DELETE Nothing

