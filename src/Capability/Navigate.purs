module Yare.Capability.Navigate where

import Custom.Prelude

import Yare.Data.Route (Route)
import Control.Monad.Trans.Class (lift)
import Halogen (HalogenM)

class Monad m ⇐ Navigate m where
  navigate ∷ Route → m Unit

instance navigateHalogenM ∷ Navigate m ⇒ Navigate (HalogenM st act slots msg m) where
  navigate = lift <<< navigate
