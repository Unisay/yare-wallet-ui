module Component.Html.Sidebar where

import Custom.Prelude hiding (div)

import Halogen.HTML.Extended (HTML, a, aside, css, i, li_, p, safeHref, span, span_, text, ul)
import Halogen.HTML.Properties (title)
import Yare.Data.Route (Route)
import Yare.Data.Route as Route

sidebar ∷ ∀ w i. Route → Array (HTML w i)
sidebar _route =
  [ aside [ css "menu" ]
      [ menuSection "General"
      , menuList
          [ menuButton Route.Home "Home" "home"
          , menuButton Route.UTxO "UTxO" "wallet"
          , menuButton Route.Transactions "Transactions" "list-check"
          , menuButton Route.Addresses "Addresses" "address-book"
          , menuButton Route.Scripts "Scripts" "scroll"
          , menuButton Route.Network "Network" "globe"
          ]
      , menuSection "NFT"
      , menuList
          [ menuButton (Route.Nft Route.Mint) "Mint" "certificate"]
      , menuSection "Auction"
      , menuList
          []
      ]
  ]

  where
  menuList ∷ Array (HTML w i) → HTML w i
  menuList = ul [ css "menu-list" ]

  menuSection ∷ String → HTML w i
  menuSection sectionTitle = p [ css "menu-label" ] [ text sectionTitle ]

  menuButton ∷ Route → String → String → HTML w i
  menuButton ref title' icon =
    li_
      [ a [ css "is-medium", title title', safeHref ref ]
          [ span [ css "icon" ] [ i [ css ("fas fa-" <> icon) ] [] ]
          , span_ [ text title' ]
          ]

      ]

