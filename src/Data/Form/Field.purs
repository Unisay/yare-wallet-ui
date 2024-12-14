module Data.Form.Field
  ( Field
  , make
  , makeShow
  , update
  , error
  , hasError
  , result
  , hasResult
  , value
  ) where

import Data.Either (Either(..))
import Data.Function ((<<<))
import Data.Maybe (Maybe(..), isJust)
import Data.Show (class Show, show)

type Err = String

newtype Field a = Field
  { parser ∷ String → Either Err a
  , printer ∷ a → String
  , state ∷ FieldState a
  }

data FieldState a
  = FieldDraft (Maybe Err) String
  | FieldValid a

make
  ∷ ∀ a
  . (String → Either Err a)
  -- ^ Parser
  → (a → String)
  -- ^ Printer
  → String
  -- ^ Draft
  → Field a
make parser printer draft = Field
  { parser
  , printer
  , state: FieldDraft Nothing draft
  }

makeShow ∷ ∀ a. Show a ⇒ (String → Either Err a) → String → Field a
makeShow parser = make parser show

update ∷ ∀ a. Field a → String → Field a
update (Field f) draft =
  case f.parser draft of
    Left e → Field (f { state = FieldDraft (Just e) draft })
    Right a → Field (f { state = FieldValid a })

error ∷ ∀ a. Field a → Maybe Err
error (Field f) =
  case f.state of
    FieldDraft e _draft → e
    FieldValid _value → Nothing

hasError ∷ ∀ a. Field a → Boolean
hasError = isJust <<< error

result ∷ ∀ a. Field a → Maybe a
result (Field f) =
  case f.state of
    FieldDraft _err _draft → Nothing
    FieldValid a → Just a

hasResult ∷ ∀ a. Field a → Boolean
hasResult = isJust <<< result

value ∷ ∀ a. Field a → String
value (Field f) =
  case f.state of
    FieldDraft _e draft → draft
    FieldValid a → f.printer a

