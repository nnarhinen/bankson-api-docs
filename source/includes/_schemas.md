# JSON Schemas

## Schema: Application

````json
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "/Application",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "redirect_uri": {
      "format": "uri",
      "type": "string",
      "required": true,
      "minLength": 1
    }
  }
}
````

## Schema: BankAccount

````json
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "/BankAccount",
  "type": "object",
  "properties": {
    "iban": {
      "iban": true,
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "bic": {
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "contract_id": {
      "type": "string"
    },
    "certificate_id": {
      "type": "integer",
      "required": true
    }
  }
}
````

## Schema: BankAccountStatement

````json
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "/BankAccountStatement",
  "type": "object",
  "properties": {
    "account_owner_name": {
      "type": "string"
    },
    "balances": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "amount": {
            "type": "number"
          },
          "booking_date": {
            "type": "string",
            "format": "date"
          },
          "available_amount": {
            "type": "number"
          }
        }
      }
    },
    "bank_account_id": {
      "type": "integer"
    },
    "created_at": {
      "type": "string",
      "format": "datetime"
    },
    "currency": {
      "type": "string"
    },
    "entries": {
      "type": "array",
      "items": {
        "type": "object",
        "description": "The statement rows",
        "properties": {
          "additional_information": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Additional information for one row. Messages etc."
          },
          "amount": {
            "type": "number"
          },
          "archive_id": {
            "type": "string",
            "description": "The archive identifier given by the bank"
          },
          "booking_date": {
            "type": "string",
            "format": "date"
          },
          "booking_information": {
            "type": "string"
          },
          "entry_reference": {
            "type": "integer",
            "description": "The row number in the statement"
          },
          "payment_date": {
            "type": "string",
            "format": "datetime"
          },
          "receiver": {
            "type": "string"
          },
          "receiver_account": {
            "type": "string"
          },
          "reference_number": {
            "type": "string"
          },
          "value_date": {
            "type": "string",
            "format": "date"
          }
        }
      }
    },
    "from": {
      "type": "string",
      "format": "datetime",
      "description": "The start date of the statement period"
    },
    "id": {
      "type": "integer"
    },
    "legal_sequence_number": {
      "type": "string",
      "description": "The sequence number for the statement given by the bank"
    },
    "servicer_bic": {
      "type": "string",
      "description": "BIC of the bank"
    },
    "servicer_name": {
      "type": "string",
      "description": "Name of the bank"
    },
    "to": {
      "type": "string",
      "format": "datetime",
      "description": "The end date of the statement period"
    },
    "updated_at": {
      "type": "string",
      "format": "datetime"
    }
  }
}
````

## Schema: Certificate

````json
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "/Certificate",
  "type": "object",
  "properties": {
    "not_after": {
      "type": "string",
      "readonly": true
    },
    "not_before": {
      "type": "string",
      "readonly": true
    },
    "subject": {
      "type": "string",
      "readonly": true
    },
    "created_at": {
      "type": "string",
      "format": "datetime"
    },
    "updated_at": {
      "type": "string",
      "format": "datetime"
    },
    "customer_id": {
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "bic": {
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "target_id": {
      "type": "string",
      "required": true,
      "minLength": 1
    }
  }
}
````

## Schema: Environment

````json
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "/Environment",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "required": true,
      "minLength": 1
    }
  }
}
````

## Schema: Payment

````json
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "/Payment",
  "type": "object",
  "properties": {
    "recipient_name": {
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "recipient_bic": {
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "recipient_iban": {
      "type": "string",
      "iban": true,
      "required": true,
      "minLength": 1
    },
    "amount": {
      "type": "double",
      "required": true,
      "minLength": 1
    },
    "payment_date": {
      "type": "string",
      "format": "date",
      "required": true
    },
    "reference_number": {
      "type": "string",
      "referenceNumber": true,
      "required": true
    },
    "vendor_reference": {
      "type": "string"
    },
    "from": {
      "required": true,
      "type": "object",
      "description": "From which bank account should the charge be done",
      "properties": {
        "iban": {
          "iban": true,
          "type": "string",
          "required": true,
          "minLength": 1
        },
        "bic": {
          "type": "string",
          "required": true,
          "minLength": 1
        }
      }
    }
  }
}
````

## Schema: User

````json
{
  "$schema": "http://json-schema.org/draft-04/schema",
  "id": "/User",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "required": true,
      "minLength": 1
    },
    "email": {
      "type": "email",
      "required": true,
      "minLength": 1,
      "format": "email"
    }
  }
}
````

