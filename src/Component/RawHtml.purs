-- | Halogen does not support writing an HTML string to the DOM.
-- | This component allows us to do this at a particular controlled HTML node.
module Yare.Component.RawHTML where

import Custom.Prelude

import Yare.Foreign.Marked (RawHTML, marked)
import Data.Foldable (for_)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Properties as HP
import Web.HTML (HTMLElement)

foreign import unsafeSetInnerHTML ∷ HTMLElement → RawHTML → Effect Unit

type State =
  { elemRef ∷ H.RefLabel
  , markdown ∷ String
  }

type Input =
  { markdown ∷ String }

data Action
  = SetInnerHTML
  | Receive Input

component ∷ ∀ q o m. MonadAff m ⇒ H.Component q Input o m
component = H.mkComponent
  { initialState: \{ markdown } → { elemRef: H.RefLabel "markdown", markdown }
  , render
  , eval: H.mkEval $ H.defaultEval
      { handleAction = handleAction
      , receive = Just <<< Receive
      , initialize = Just SetInnerHTML
      }
  }
  where
  handleAction ∷ Action → H.HalogenM State Action () o m Unit
  handleAction = case _ of
    SetInnerHTML → do
      { elemRef } ← H.get
      mbElem ← H.getHTMLElementRef elemRef
      for_ mbElem \el → do
        { markdown } ← H.get
        H.liftEffect $ unsafeSetInnerHTML el $ marked markdown

    Receive { markdown } → do
      H.modify_ _ { markdown = markdown }
      handleAction SetInnerHTML

  render ∷ State → H.ComponentHTML Action () m
  render state = HH.div [ HP.ref state.elemRef ] []
