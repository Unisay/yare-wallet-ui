module Yare.Data.Route where

import Custom.Prelude hiding ((/))

import Data.Either (note)
import Data.Generic.Rep (class Generic)
import Data.Show.Generic (genericShow)
import Routing.Duplex (RouteDuplex', as, root)
import Routing.Duplex.Generic (noArgs, sum)
import Routing.Duplex.Generic.Syntax ((/))
import Slug (Slug)
import Slug as Slug

data Route
  = Home
  | UTxO
  | Transactions
  | Network
  | Scripts
  | Addresses
  | Nft NftRoute

derive instance genericRoute ∷ Generic Route _
derive instance eqRoute ∷ Eq Route
derive instance ordRoute ∷ Ord Route
instance showRoute ∷ Show Route where
  show = genericShow

data NftRoute = Mint

derive instance genericNftRoute ∷ Generic NftRoute _
derive instance eqNftRoute ∷ Eq NftRoute
derive instance ordNftRoute ∷ Ord NftRoute
instance showNftRoute ∷ Show NftRoute where
  show = genericShow

routeCodec ∷ RouteDuplex' Route
routeCodec = root $ sum
  { "Home": noArgs
  , "UTxO": "utxo" / noArgs
  , "Transactions": "txs" / noArgs
  , "Network": "network" / noArgs
  , "Scripts": "scripts" / noArgs
  , "Addresses": "addresses" / noArgs
  , "Nft": "nft" / nftRouteCodec
  }

nftRouteCodec ∷ RouteDuplex' NftRoute
nftRouteCodec = sum { "Mint": "mint" / noArgs }

slug ∷ RouteDuplex' String → RouteDuplex' Slug
slug = as Slug.toString (Slug.parse >>> note "Bad slug")
