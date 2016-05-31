# Errors

```shell
curl "https://api.bankson.fi/payments" -i -X POST
  -H "Authorization: 4fc79757419b539937b94f1bd0f6e315765bbde4"

HTTP/1.1 400 Bad Request
content-type: application/json; charset=utf-8
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.payments.create({}, {}).then(function() {
  // Never called
}).catch(function(err) {
  // err.status === 400
  // err.body === { error: 'Validation failed', details: [{...}, {...}] }
});
```

> JSON output

```json
{
  "error": "Validation failed",
  "details": [
    {
      "property": "instance.recipient_name",
      "message": "is required",
      "schema": {
        "type": "string",
        "required": true,
        "minLength": 1
      },
      "name": "required",
      "stack": "instance.recipient_name is required"
    },
    {
      "property": "instance.recipient_bic",
      "message": "is required",
      "schema": {
        "type": "string",
        "required": true,
        "minLength": 1
      },
      "name": "required",
      "stack": "instance.recipient_bic is required"
    },
    {
      "property": "instance.recipient_iban",
      "message": "is required",
      "schema": {
        "type": "string",
        "iban": true,
        "required": true,
        "minLength": 1
      },
      "name": "required",
      "stack": "instance.recipient_iban is required"
    },
    {
      "property": "instance.amount",
      "message": "is required",
      "schema": {
        "type": "double",
        "required": true,
        "minLength": 1
      },
      "name": "required",
      "stack": "instance.amount is required"
    },
    {
      "property": "instance.payment_date",
      "message": "is required",
      "schema": {
        "type": "string",
        "format": "date",
        "required": true
      },
      "name": "required",
      "stack": "instance.payment_date is required"
    },
    {
      "property": "instance.reference_number",
      "message": "is required",
      "schema": {
        "type": "string",
        "referenceNumber": true,
        "required": true
      },
      "name": "required",
      "stack": "instance.reference_number is required"
    },
    {
      "property": "instance.from",
      "message": "is required",
      "schema": {
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
      },
      "name": "required",
      "stack": "instance.from is required"
    }
  ]
}
```

The Bankson API uses the following error codes:


Error Code | Meaning
---------- | -------
400 | Bad Request -- Something about the request is malformed or schema validation did not succeed.
401 | Unauthorized -- The valua provided in `Authorization` header is invalid
404 | Not Found -- The specified resource could not be found
406 | Not Acceptable -- The specified resource cannot be represented in the format specified by `Accept` request header.
500 | Internal Server Error -- We had a problem with our server. Try again later.
503 | Service Unavailable -- We're temporarially offline for maintanance. Please try again later.

Detailed information can be found in the response body. All error responses contain a `message` property.
