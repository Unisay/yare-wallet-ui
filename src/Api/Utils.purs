module Yare.Api.Utils where

import Custom.Prelude

import Affjax as Affjax
import Affjax.Web (request)
import Control.Alternative (class Plus, empty)
import Data.Argonaut.Core (Json)
import Data.Codec.Argonaut (JsonCodec, JsonDecodeError, printJsonDecodeError)
import Data.Codec.Argonaut as CA
import Data.Either (Either)
import Effect.Aff.Class (class MonadAff, liftAff)
import Halogen.Store.Monad (class MonadStore, getStore)
import Yare.Api.Request (RequestOptions, defaultRequest)
import Yare.Capability.LogMessages (class LogMessages, logError)
import Yare.Store (Action, Store)

mkRequest
  ∷ ∀ m
  . MonadAff m
  ⇒ MonadStore Action Store m
  ⇒ RequestOptions
  → m (Either Affjax.Error Json)
mkRequest opts = do
  { baseUrl } ← getStore
  response ← liftAff $ request $ defaultRequest baseUrl opts
  pure $ map _.body response

handleResponseErrors
  ∷ ∀ m a k
  . LogMessages m
  ⇒ JsonCodec a
  -- ^ Codec
  → (Either (Either Affjax.Error JsonDecodeError) a → k)
  -- ^ Continuation
  → Either Affjax.Error Json
  -- ^ Response
  → m k
handleResponseErrors codec k =
  case _ of
    Left err →
      logError (Affjax.printError err) $> k (Left (Left err))
    Right json →
      case CA.decode codec json of
        Left err → logError (printJsonDecodeError err) $> k (Left (Right err))
        Right addresses → pure (k (Right addresses))

emptyOnError
  ∷ ∀ f a
  . Plus f
  ⇒ Either (Either Affjax.Error JsonDecodeError) (f a)
  → f a
emptyOnError = either (const empty) identity
