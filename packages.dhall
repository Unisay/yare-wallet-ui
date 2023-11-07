let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.10-20231020/packages.dhall
        sha256:69f8fd243ba74ed3ff4a2ebe67b2eeccd7d7df9937dd8f1de22be29b4485e130

let overrides = {=}

let additions =
      { custom-prelude =
        { dependencies = [ "debug", "either", "maybe", "prelude", "strings" ]
        , repo = "https://github.com/Unisay/purescript-custom-prelude.git"
        , version = "v1.2.0"
        }
      }

in  upstream // overrides // additions
