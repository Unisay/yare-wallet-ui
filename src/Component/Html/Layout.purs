module Component.Html.Layout where

import Custom.Prelude hiding (div)

import Halogen.HTML.Extended (HTML, css, div, div_, h1, nav, span, text)

layout ∷ ∀ w i. String → Array (HTML w i) → Array (HTML w i) → HTML w i
layout title sidebarHtml contentHtml =
  div_
    [ header title
    , body sidebarHtml contentHtml
    ]

header ∷ ∀ w i. String → HTML w i
header headerTitle =
  nav [ css "level m-4" ]
    [ div [ css "level-left" ]
        [ h1 [ css "is-size-1" ]
            [ span [ css "yare px-4" ] [ text "Y're" ]
            , text (" @ " <> headerTitle)
            ]
        ]
    ]

body ∷ ∀ w i. Array (HTML w i) → Array (HTML w i) → HTML w i
body sidebarHtml contentHtml =
  div
    [ css "columns" ]
    [ div [ css "column is-narrow" ] [ div [ css "box" ] sidebarHtml ]
    , div [ css "column" ] contentHtml
    ]

