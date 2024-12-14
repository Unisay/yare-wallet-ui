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
import Event as Event
import Halogen as H
import Halogen.HTML.Events as HE
import Halogen.HTML.Extended (css)
import Halogen.HTML.Extended as HH
import Halogen.HTML.Properties as HP
import Halogen.Subscription as HS
import Yare.Capability.LogMessages (class LogMessages)
import Yare.Capability.Now (class Now)
import Yare.Data.Route as Route

data Action
  = SubmitForm
  | UpdatePolicy String
  | UpdateTokenName String

type Error = String

type State =
  { policy ∷ Field Policy
  , tokenName ∷ Field TokenName
  , eventListener ∷ HS.Listener Event.MintingInitiated
  }

type Input = HS.Listener Event.MintingInitiated

component
  ∷ ∀ q o m
  . Now m
  ⇒ LogMessages m
  ⇒ MonadEffect m
  ⇒ H.Component q Input o m
component = H.mkComponent
  { initialState
  , render
  , eval: H.mkEval $ H.defaultEval { handleAction = handleAction }
  }

  where

  initialState ∷ Input → State
  initialState eventListener =
    { policy: Field.make parsePolicy printPolicy ""
    , tokenName: Field.make parseTokenName printTokenName ""
    , eventListener
    }

  handleAction ∷ ∀ slots. Action → H.HalogenM State Action slots o m Unit
  handleAction = case _ of
    UpdatePolicy policy →
      H.modify_ \s → s { policy = Field.update s.policy policy }

    UpdateTokenName tokenName →
      H.modify_ \s → s { tokenName = Field.update s.tokenName tokenName }

    SubmitForm → do
      { policy, tokenName, eventListener } ← H.get
      case Field.result policy, Field.result tokenName of
        Just p, Just t → do
          let asset = nativeToken p t
          resetForm
          H.liftEffect $ HS.notify eventListener (Event.MintingInitiated asset)
        _, _ → pass

    where

    resetForm ∷ H.HalogenM State Action slots o m Unit
    resetForm = H.put <<< initialState =<< H.gets _.eventListener

render ∷ ∀ m slots. State → H.ComponentHTML Action slots m
render st =
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
                    , HE.onValueInput UpdatePolicy
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
                    , HE.onValueInput UpdateTokenName
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
                    , HE.onClick \_event → SubmitForm
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

