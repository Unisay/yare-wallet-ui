module Yare.Component.Nft (component) where

import Custom.Prelude hiding (div)

import Cardano.Value (parsePolicy, parseTokenName, printPolicy, printTokenName)
import Cardano.Value.Asset (nativeToken)
import Cardano.Value.Token.Name (TokenName)
import Cardano.Value.Token.Policy (Policy)
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
import Yare.Capability.Resource.Minting (class Minting)
import Yare.Data.Route as Route

type Error = String
type Input = Unit
type State =
  { policy ∷ Field Policy
  , tokenName ∷ Field TokenName
  }

component
  ∷ ∀ q i o m
  . Minting m
  ⇒ LogMessages m
  ⇒ MonadEffect m
  ⇒ H.Component q i o m
component = Hooks.component \_tokens _input → Hooks.do
  _ /\ assets ← Store.useAssets identity
  st /\ stId ← Hooks.useState initialState

  let
    updatePolicy str = Hooks.modify_ stId \s →
      s { policy = Field.update s.policy str }

    updateTokenName str = Hooks.modify_ stId \s →
      s { tokenName = Field.update s.tokenName str }

    onSubmit = do
      { policy, tokenName } ← Hooks.get stId
      case Field.result policy, Field.result tokenName of
        Just p, Just t → do
          Hooks.put stId initialState -- reset form
          assets.dispatch (RequestMint (nativeToken p t))
        _, _ → pass

  Hooks.pure do
    let
      formIsDisabled = not do
        Field.hasResult st.policy
          && Field.hasResult st.tokenName

      submitOnEnter keyboardEvent =
        case KE.code keyboardEvent of
          "Enter" → onSubmit
          _ → pass

    layout "NFT" (sidebar (Route.Nft Route.Mint))
      [ HH.div [ css "box" ]
          [ HH.div [ css "field"]
              [ HH.label
                  [ css "label", HP.for "policy" ]
                  [ HH.text "Policy ID" ]
              , HH.div [ css "control has-icons-left" ]
                  [ HH.input
                      [ css "input is-family-code"
                      , HP.type_ HP.InputText
                      , HP.id "policy"
                      , HP.name "policy"
                      , HP.value (Field.value st.policy)
                      , HP.required true
                      , HP.placeholder "Hex-encoded"
                      , HE.onValueInput updatePolicy
                      , HE.onKeyDown submitOnEnter
                      ]
                  , HH.span
                      [ css "icon is-small is-left" ]
                      [ HH.i [ css "fas fa-thumbtack" ] [] ]
                  ]
              , HH.maybeElem (Field.error st.policy) \err →
                  HH.p [ css "help is-danger" ] [ HH.text err ]
              ]
          , HH.div [ css "field" ]
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
                      [ HH.text "Initiate Minting" ]
                  ]
              ]
          ]
      ]

initialState ∷ State
initialState =
  { policy: Field.make parsePolicy printPolicy ""
  , tokenName: Field.make parseTokenName printTokenName ""
  }

