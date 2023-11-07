module Yare.Component.Utils where

import Data.Unit (Unit)
import Data.Void (Void)
import Halogen as H

type OpaqueSlot slot = ∀ query. H.Slot query Void slot

type OpaqueSlot_ = OpaqueSlot Unit
