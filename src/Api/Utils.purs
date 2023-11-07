module Yare.Api.Utils where

import Custom.Prelude

import Affjax.Web (request)
import Yare.Api.Request (RequestOptions, defaultRequest)
import Yare.Capability.LogMessages (class LogMessages, logError)
import Yare.Capability.Now (class Now)
import Yare.Store (Action, Store)
import Data.Argonaut.Core (Json)
import Data.Bifunctor (rmap)
import Data.Codec.Argonaut (JsonCodec, printJsonDecodeError)
import Data.Codec.Argonaut as CA
import Data.Either (Either(..), hush)
import Data.Maybe (Maybe(..))
import Effect.Aff.Class (class MonadAff, liftAff)
import Halogen.Store.Monad (class MonadStore, getStore)

mkRequest
  ∷ ∀ m
  . MonadAff m
  ⇒ MonadStore Action Store m
  ⇒ RequestOptions
  → m (Maybe Json)
mkRequest opts = do
  { baseUrl } ← getStore
  response ← liftAff $ request $ defaultRequest baseUrl opts
  pure $ hush $ rmap _.body response

-- | This small utility decodes JSON and logs any failures that occurred,
-- | returning the parsed value only if decoding succeeded. This utility makes
-- | it easy to abstract the mechanices of dealing with malformed responses.
decode
  ∷ ∀ m a
  . LogMessages m
  ⇒ Now m
  ⇒ String
  → JsonCodec a
  → Maybe Json
  → m (Maybe a)
decode res _ Nothing = ado
  logError $ "Network resource unreachable: " <> res
  in Nothing
decode _res codec (Just json) = case CA.decode codec json of
  Left err → logError (printJsonDecodeError err) *> pure Nothing
  Right response → pure (Just response)
