module Yare.Api.Endpoint
  ( Endpoint(..)
  , endpointCodec
  ) where

import Custom.Prelude hiding ((/))

import Data.Generic.Rep (class Generic)
import Routing.Duplex (RouteDuplex', root)
import Routing.Duplex.Generic (noArgs, sum)
import Routing.Duplex.Generic.Syntax ((/))

data Endpoint
  = Utxo
  | ChainTip

derive instance genericEndpoint ∷ Generic Endpoint _

endpointCodec ∷ RouteDuplex' Endpoint
endpointCodec = root $ sum
  { "Utxo": "utxo" / noArgs
  , "ChainTip": "tip" / noArgs
  }

