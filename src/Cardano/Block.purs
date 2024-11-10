module Cardano.Block where

import Data.Codec.Argonaut (JsonCodec)
import Data.Codec.Argonaut as CA
import Data.Codec.Argonaut.Record as CAR
import Data.Newtype (class Newtype)

--------------------------------------------------------------------------------
-- Block Hash ------------------------------------------------------------------

newtype BlockHash = BlockHash String

renderBlockHash ∷ BlockHash → String
renderBlockHash (BlockHash blockHash) = blockHash

derive instance newtypeBlockHash ∷ Newtype BlockHash _

codecBlockHash ∷ JsonCodec BlockHash
codecBlockHash = CA.coercible "BlockHash" CA.string

--------------------------------------------------------------------------------
-- Block Reference -------------------------------------------------------------

type BlockRef =
  { slotNo ∷ Int
  , blockNo ∷ Int
  , headerHash ∷ BlockHash
  }

codecBlockRef ∷ JsonCodec BlockRef
codecBlockRef = CAR.object "BlockRef"
  { slotNo: CA.int
  , blockNo: CA.int
  , headerHash: codecBlockHash
  }
