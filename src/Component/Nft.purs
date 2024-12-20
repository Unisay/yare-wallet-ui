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
import Yare.Capability.LogMessages (class LogMessages)
import Yare.Capability.Now (class Now)
import Yare.Data.Route as Route

data Action
  = SubmitForm
  | UpdatePolicy String
  | UpdateTokenName String

type Error = String
type Input = Unit
type State =
  { policy ∷ Field Policy
  , tokenName ∷ Field TokenName
  }

component ∷ ∀ q i o m. H.Component q i o m
component = Hooks.component \_tokens _input → Hooks.do
  st /\ stId ← Hooks.useState initialState
  Hooks.pure do
    layout "NFT" (sidebar (Route.Nft Route.Mint))
      [ HH.div [ css "box" ]
          [ HH.div [ css "field" ]
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
                      , HE.onValueInput \str →
                          Hooks.modify_ stId \s →
                            s { policy = Field.update s.policy str }
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
                      , HE.onValueInput \str →
                          Hooks.modify_ stId \s →
                            s { tokenName = Field.update s.tokenName str }
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
                      , HE.onClick \_event → do
                          { policy, tokenName } ← Hooks.get stId
                          case Field.result policy, Field.result tokenName of
                            Just p, Just t → do
                              Hooks.put stId initialState
                            --  TODO: emit event (Event.MintingInitiated asset)
                            -- let asset = nativeToken p t
                            _, _ → pass
                      , HP.disabled $ not
                          ( Field.hasResult st.policy
                              && Field.hasResult st.tokenName
                          )
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

useStateFn
  ∷ ∀ state m a
  . (Hooks.StateId state → a)
  → state
  → Hooks.Hook m (Hooks.UseState state) (state /\ a)
useStateFn fn initial = map (map fn) (Hooks.useState initial)
