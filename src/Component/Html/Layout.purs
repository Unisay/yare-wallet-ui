module Component.Html.Layout where

import Custom.Prelude hiding (div)

import Halogen.HTML.Extended (HTML, a, css, div, div_, h1, i, nav, safeHref, span, text)
import Halogen.HTML.Properties (title)
import Yare.Data.Route (Route(..))

layout ∷ ∀ w i. Route → String → Array (HTML w i) → Array (HTML w i) → HTML w i
layout route title sidebarHtml contentHtml =
  div_
    [ header route title
    , body sidebarHtml contentHtml
    ]

header ∷ ∀ w i. Route → String → HTML w i
header route headerTitle =
  nav [ css "level m-4" ]
    [ div [ css "level-left" ]
        [ h1 [ css "is-size-1" ]
            [ span [ css "yare px-4" ] [ text "Y're" ]
            , text (" @ " <> headerTitle)
            ]
        ]
    , div [ css "level-right" ]
        [ menuButton Home "Home" "home"
        , menuButton UTxO "Wallets" "wallet"
        , menuButton Transactions "Transactions" "list-check"
        , menuButton Network "Network" "globe"
        ]
    ]
  where
  menuButton ∷ Route → String → String → HTML w i
  menuButton ref title' icon =
    if ref == route then text ""
    else
      a
        [ css "level-item button is-large", title title', safeHref ref ]
        [ span [ css "icon" ] [ i [ css ("fas fa-" <> icon) ] [] ] ]

body ∷ ∀ w i. Array (HTML w i) → Array (HTML w i) → HTML w i
body sidebarHtml contentHtml =
  div
    [ css "columns" ]
    [ div [ css "column is-narrow" ] sidebarHtml
    , div [ css "column" ] contentHtml
    ]
