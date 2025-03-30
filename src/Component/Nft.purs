module Yare.Component.Nft (component) where

import Custom.Prelude hiding (div)

import Cardano.Value (parseTokenName, printTokenName)
import Cardano.Value.Token.Name (TokenName)
import Component.Html.Layout (layout)
import Component.Html.Sidebar (sidebar)
import Data.Form.Field (Field)
import Data.Form.Field as Field
import Effect.Class (class MonadEffect)
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended (css)
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties as HP
import Halogen.Hooks as Hooks
import Store (Action(..))
import Store as Store
import Web.UIEvent.KeyboardEvent as KE
import Yare.Capability.LogMessages (class LogMessages)
import Yare.Capability.Resource.Assets (class Assets)
import Yare.Data.Route as Route

type Error = String
type Input = Unit
type State =
  { tokenName ∷ Field TokenName
  }

component
  ∷ ∀ q i o m
  . Assets m
  ⇒ LogMessages m
  ⇒ MonadEffect m
  ⇒ H.Component q i o m
component = Hooks.component \_tokens _input → Hooks.do
  _ /\ assets ← Store.useAssets identity
  st /\ stId ← Hooks.useState initialState

  let
    updateTokenName str = Hooks.modify_ stId \s →
      s { tokenName = Field.update s.tokenName str }

    onSubmit = do
      { tokenName } ← Hooks.get stId
      case Field.result tokenName of
        Just t → do
          Hooks.put stId initialState -- reset form
          assets.dispatch (RequestMint t)
        _ → pass

  Hooks.pure do
    let
      formIsDisabled = not (Field.hasResult st.tokenName)

      submitOnEnter keyboardEvent =
        case KE.code keyboardEvent of
          "Enter" → onSubmit
          _ → pass

    layout "NFT" (sidebar (Route.Nft Route.Mint))
      [ HH.div [ css "box" ]
          [ HH.div [ css "field" ]
              [ HH.label
                  [ css "label", HP.for "tokenName" ]
                  [ HH.text "Token Name" ]
              , HH.div [ css "control has-icons-left" ]
                  [ HH.input
                      [ css "input is-family-code"
                      , HP.type_ HP.InputText
                      , HP.id "tokenName"
                      , HP.name "tokenName"
                      , HP.value (Field.value st.tokenName)
                      , HP.required true
                      , HP.placeholder "e.g. MyNFT"
                      , HE.onValueInput updateTokenName
                      , HE.onKeyDown submitOnEnter
                      ]
                  , HH.span
                      [ css "icon is-small is-left" ]
                      [ HH.i [ css "fas fa-clipboard" ] [] ]
                  ]
              , HH.maybeElem (Field.error st.tokenName) \err →
                  HH.p [ css "help is-danger" ] [ HH.text err ]
              ]
          , HH.div [ css "field" ]
              [ HH.div [ css "control" ]
                  [ HH.button
                      [ css "button is-link"
                      , HE.onClick \_mouseEvent → onSubmit
                      , HP.disabled formIsDisabled
                      ]
                      [ HH.text "Initiate Assets" ]
                  ]
              ]
          ]
      ]

initialState ∷ State
initialState =
  { tokenName: Field.make parseTokenName printTokenName ""
  }

