module Yare.Component.Home (component) where

import Custom.Prelude hiding (div)

import Component.Html.Layout (layout)
import Component.Html.Sidebar (sidebar)
import Halogen (Component, defaultEval, mkComponent, mkEval)
import Halogen.HTML.Extended (a, p_, safeHref, text)
import Yare.Capability.Navigate (class Navigate)
import Yare.Data.Route (Route(..))

component ∷ ∀ q i o m. Navigate m ⇒ Component q i o m
component = mkComponent
  { initialState: const unit
  , render
  , eval: mkEval defaultEval
  }
  where
  render _ = layout "home" (sidebar Home)
    [ p_
        [ text "You can visit "
        , a [ safeHref Network ] [ text "Network information page" ]
        ]
    ]

