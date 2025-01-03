module Yare.Capability.Now where

import Custom.Prelude

import Control.Monad.Trans.Class (lift)
import Data.DateTime (Date, DateTime, Time)
import Data.DateTime.Instant (Instant)
import Effect (Effect)
import Effect.Now as Now
import Halogen (HalogenM)
import Halogen.Hooks (HookM)

class Monad m ⇐ Now m where
  now ∷ m Instant
  nowDate ∷ m Date
  nowTime ∷ m Time
  nowDateTime ∷ m DateTime

instance nowEffect ∷ Now Effect where
  now = Now.now
  nowDate = Now.nowDate
  nowTime = Now.nowTime
  nowDateTime = Now.nowDateTime

instance nowHalogenM ∷ Now m ⇒ Now (HalogenM st act slots msg m) where
  now = lift now
  nowDate = lift nowDate
  nowTime = lift nowTime
  nowDateTime = lift nowDateTime

instance nowHookM ∷ Now m ⇒ Now (HookM m) where
  now = lift now
  nowDate = lift nowDate
  nowTime = lift nowTime
  nowDateTime = lift nowDateTime
