module Cardano.Value.Asset.MintStatus where

import Custom.Prelude

data MintStatus = NotMinted | MintRequested | Minted

derive instance eqMintStatus ∷ Eq MintStatus

instance showMintStatus ∷ Show MintStatus where
  show = case _ of
    NotMinted → "NotMinted"
    MintRequested → "MintRequested"
    Minted → "Minted"
