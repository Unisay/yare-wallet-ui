let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.12-20231123/packages.dhall
        sha256:95ecd1a23305f270971f4d4f2040541559116de6e21aba773d368787f7f1ed35

let overrides = {=}

let additions =
      { custom-prelude =
        { dependencies = [ "debug", "either", "maybe", "prelude", "strings" ]
        , repo = "https://github.com/Unisay/purescript-custom-prelude.git"
        , version = "v1.2.0"
        }
      }

in  upstream // overrides // additions
