let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.15-20250311/packages.dhall
        sha256:a5f3cbdf8fe4785c18303875b4d74bbdbcdb334332f92ee0e7db4c8af8524286

let overrides = {=}

let additions =
      { custom-prelude =
        { dependencies = [ "debug", "either", "maybe", "prelude", "strings" ]
        , repo = "https://github.com/Unisay/purescript-custom-prelude.git"
        , version = "v1.2.0"
        }
      }

in  upstream // overrides // additions
