{ name = "yare-wallet-ui"
, dependencies =
  [ "aff"
  , "affjax"
  , "affjax-web"
  , "argonaut-core"
  , "arrays"
  , "codec"
  , "codec-argonaut"
  , "console"
  , "control"
  , "custom-prelude"
  , "datetime"
  , "effect"
  , "either"
  , "foldable-traversable"
  , "formatters"
  , "halogen"
  , "http-methods"
  , "integers"
  , "js-bigints"
  , "maybe"
  , "newtype"
  , "now"
  , "prelude"
  , "profunctor"
  , "remotedata"
  , "routing"
  , "routing-duplex"
  , "slug"
  , "strings"
  , "transformers"
  , "unicode"
  , "variant"
  , "web-html"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
