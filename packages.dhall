let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.15-20241207/packages.dhall
        sha256:604d38aa63b48c64f22747beba7e198b7bde7a645de7f9ddac1d023fd4ea72a8

let overrides = {=}

let additions =
      { custom-prelude =
        { dependencies = [ "debug", "either", "maybe", "prelude", "strings" ]
        , repo = "https://github.com/Unisay/purescript-custom-prelude.git"
        , version = "v1.2.0"
        }
      }

in  upstream // overrides // additions
