module Yare.Foreign.Marked
  ( RawHTML
  , marked
  ) where

-- | The `Marked` library transforms an input string (which should be
-- | markdown) into an output HTML string, even if it failed to parse the input
-- | markdown. I'd like to know at glance that I'm using a string of HTML, so
-- | we'll use a newtype to track that information in the type system.
newtype RawHTML = RawHTML String

-- | The `markedImpl` function is a native JavaScript function we're importing
-- | into PureScript. The compiler will not check this type.
-- |
-- | It's best to use native JavaScript types when you use the FFI, and then
-- | translate them into PureScript types. For example, we foreign import
-- | `markedImpl`, but export a different function which makes better use of the
-- | type system.
foreign import markedImpl :: String -> String

-- | For such a simple function there's little conversion needed from JavaScript
-- | to PureScript. All that we'll do is wrap the result string in our `RawHTML`
-- | newtype. More complex foreign imports warrant more sophisticated
-- | interoperability.
marked :: String -> RawHTML
marked str = RawHTML (markedImpl str)
