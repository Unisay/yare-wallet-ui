module Yare.Api.Endpoint
  ( Endpoint(..)
  , endpointCodec
  ) where

import Custom.Prelude hiding ((/))

import Cardano.Value.Token.Name (TokenName, parseTokenNameHex, printTokenNameHex)
import Data.Generic.Rep (class Generic)
import Routing.Duplex (RouteDuplex', as, root, segment)
import Routing.Duplex.Generic (noArgs, sum)
import Routing.Duplex.Generic.Syntax ((/))

data Endpoint
  = Utxo
  | Transactions
  | Network
  | Scripts
  | Addresses
  | Assets TokenName

derive instance genericEndpoint ∷ Generic Endpoint _

endpointCodec ∷ RouteDuplex' Endpoint
endpointCodec = root $ sum
  { "Utxo": "utxo" / noArgs
  , "Transactions": "transactions" / noArgs
  , "Network": "network" / noArgs
  , "Scripts": "script" / noArgs
  , "Addresses": "addresses" / noArgs
  , "Assets": "assets" / as printTokenNameHex parseTokenNameHex segment
  }

