---
title: API Reference

language_tabs:
  - shell

toc_footers:
  - <a href='http://www.bankson.fi'>Bankson home page</a>
  - <a href='https://app.bankson.fi'>Sign Up for Bankson</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

# Introduction

You can view code examples in the dark area to the right.

# Authentication

> To authorize, use this code:

```shell
# With shell, you can just pass the correct header with each request
curl https://api.bankson.fi
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

> Make sure to replace `4fc79757419b539937b94f1bd0f6e315765bbde4` with the bearer token obtained by Oauth2.

All requests must include the `Authorization` header to identify the requests.

Authorization is based on OAuth2 specification. The grant types used are `authorization_code` and `refresh_token`.

The endpoints are `/oauth/authorize` for showing the authorization dialog to the user and `/oauth/token` for fetching `access_token` and `refresh_token`.

# Testing

> List certificates in test environment

```shell
curl "https://api.bankson.fi/api/certificates"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "X-Bankson-Environment: Test"
```

Bankson has two environments, test and production. Both environments contain their own resources.
When using test environment certificates all requests to banks are routed to the test environments provided by the banks. This way you can test integrations
without using your actual bank account and money.

Make sure to specify `X-Bankson-Environment` header with the value `Test` to make bankson use test data.

# User information

## Get user information

```shell
curl "https://api.bankson.fi/me"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

> The above command returns JSON structured like this:

```json
{
  "user": {
    "id": 1,
    "environment_id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "created_at":"2016-05-23T21:08:16.211Z",
    "updated_at":"2016-05-23T21:08:16.211Z"
  },
  "environment": {
    "id": 1,
    "name": "Example Oy",
    "business_id": "1234567-1",
    "created_at": "2016-05-23T21:08:16.128Z",
    "updated_at": "2016-05-23T21:08:16.128Z",
    "bankAccounts": [{
      "id": 1,
      "certificate_id": 1,
      "environment_id": 1,
      "iban": "FI4819503000000010",
      "bic": "NDEAFIHH",
      "contract_id": "11111111",
      "created_at":"2016-05-23T21:08:16.503Z",
      "updated_at":"2016-05-23T21:08:16.503Z",
      "balance": null,
      "balance_date": null,
      "test": true
    }],
    "subscription": false
  }
}
```

This endpoint shows information about the logged in user and associated organization.

### HTTP Request

`GET https://api.bankson.fi/me`


# Certificates

Certificates are used to communicate and authenticate to bank API's.

## List certificates

```shell
curl "https://api.bankson.fi/certificates"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

> JSON response

```json
[{
  "id": 1,
  "environment_id": 1,
  "bank_customer_id": "11111111",
  "bank_target_id": "11111111A1",
  "bic": "NDEAFIHH",
  "certificate_type": "signing",
  "created_at": "2016-05-23T21:08:16.493Z",
  "updated_at": "2016-05-23T21:08:16.493Z",
  "test": true,
  "not_after": "2017-04-16T09:04:04.000Z",
  "not_before": "2015-04-16T09:04:04.000Z",
  "subject": "C=FI/CN=Nordea Demo Certificate/serialName=5780860238"
}]
```

Returns a list of all certificates associated with the organization.

### HTTP Request

`GET https://api.bankson.fi/certificates`

## Upload certificate

```shell
curl "https://api.bankson.fi/certificates/upload" -X POST
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "Content-Type: multipart/form-data"
  -F customer_id=11111111
  -F target_id=11111111A1
  -F pin=WSNDEA1234
  -F bic=NDEAFIHH
  -F certificate=@WSNDEA1234.p12
```
> JSON response, http status code `201 Created`

```json
{
  "id": 1,
  "environment_id": 1,
  "bank_customer_id": "11111111",
  "bank_target_id": "11111111A1",
  "bic": "NDEAFIHH",
  "certificate_type": "signing",
  "created_at": "2016-05-23T21:08:16.493Z",
  "updated_at": "2016-05-23T21:08:16.493Z",
  "test": true,
  "not_after": "2017-04-16T09:04:04.000Z",
  "not_before": "2015-04-16T09:04:04.000Z",
  "subject": "C=FI/CN=Nordea Demo Certificate/serialName=5780860238"
}
```

Upload a `.p12` bundle containing the certificate used for signing bank requests.

### HTTP request

`POST https://api.bankson.fi/certificates/upload`

### Form parameters

Parameter   | Description
---------   | -----------
customer_id | The id number given by your bank
target_id   | [optional] Used by some banks to further identify users
pin         | Pin code of the `.p12` bundle
bic         | The BIC code of the bank
certificate | the actual `.p12` file

## Request certificate from bank

```shell
curl "https://api.bankson.fi/certificates/request" -X POST
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "Content-Type: application/json"
  -d '{ "customer_id": "11111111", "target_id": "11111111A1", "transfer_key1": "1234567890", "bic": "NDEAFIHH" }'
```

> JSON response, http status code `201 Created`

```json
[{
  "certificate_type": "signing",
  "environment_id": 1,
  "bank_customer_id": "11111111",
  "bank_target_id": "11111111A1",
  "bic": "NDEAFIHH",
  "test": true,
  "updated_at": "2016-05-24T20:59:32.564Z",
  "created_at": "2016-05-24T20:59:32.564Z",
  "id": 4,
  "not_after": "2012-04-01T07:45:35.000Z",
  "not_before":"2010-04-01T07:45:35.000Z",
  "subject": "C=FI/CN=eid onfile/serialName=2094370004"
}]
```

Request certificate from bank by using transfer keys provided by the bank

### HTTP request

`POST https://api.bankson.fi/certificates/request`

### JSON parameters

Parameter | Description
--------- | -----------
customer_id | The id number given by your bank
target_id | [optional] Used by some banks to further identify users
transfer_key1 | Transfer key (part1) or PIN code
transfer_key2 | Trasnfer key (part2), if available
bic | The BIC code of the bank

### Return value

Returns a list of certificates created by the request


## Delete certificate

```shell
curl "https:/api.bankson.fi/certificates/2" -X DELETE
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

> Empty response, http status code `204 No content`

Delete certificate from Bankson

### HTTP request

`DELETE https://api.bankson.fi/certificates/:id`

## Renew certificate

```shell
curl "https:/api.bankson.fi/certificates/4/renew" -X POST
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

> JSON response

```json
{
  "certificate_type": "signing",
  "environment_id": 1,
  "bank_customer_id": "11111111",
  "bank_target_id": "11111111A1",
  "bic": "NDEAFIHH",
  "test": true,
  "updated_at": "2016-05-24T20:59:32.564Z",
  "created_at": "2016-05-24T20:59:32.564Z",
  "id": 4,
  "not_after": "2012-04-01T07:45:35.000Z",
  "not_before":"2010-04-01T07:45:35.000Z",
  "subject": "C=FI/CN=eid onfile/serialName=2094370004"
}
```

Renew certificate already expired or nearing expiration.

If the certificate has not yet expired, this request can be called with an empty body and the certificate
will be renewed by using the certificate itself to sign the request.

If the certificate already has expired, you need to obtain new transfer keys from the bank to re-request the certificate.

### HTTP request

`POST https://api.bankson.fi/certificates/:id/renew`

### JSON attributes

(Only needed to renew an expired certificate)

Parameter | Description
--------- | -----------
customer_id | The id number given by your bank
transfer_key1 | Transfer key (part1) or PIN code
transfer_key2 | Trasnfer key (part2), if available

# Bank accounts

## List bank accounts

```shell
curl "https://api.bankson.fi/bankaccounts"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

> JSON response

```json
[{
  "id": 1,
  "certificate_id": 1,
  "environment_id": 1,
  "iban": "FI4819503000000010",
  "bic": "NDEAFIHH",
  "contract_id": "11111111",
  "created_at": "2016-05-23T21:08:16.503Z",
  "updated_at":"2016-05-23T21:08:16.503Z",
  "balance": null,
  "balance_date": null,
  "test":true
}]
```

List all bank accounts known to Bankson.

### HTTP request

`GET https://api.bankson.fi/bankaccounts`

## Add bank account

```shell
curl "https://api.bankson.fi/bankaccounts" -X POST
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "Content-Type: application/json"
  -d '{ "bic": "NDEAFIHH", "iban": "FI4819503000000010", "certificate_id": 1, "contract_id": "1234" }'
```

> JSON response

```json
{
  "id": 5,
  "certificate_id": 1,
  "environment_id": 1,
  "iban": "FI4819503000000010",
  "bic": "NDEAFIHH",
  "contract_id": "11111111",
  "created_at": "2016-05-23T21:08:16.503Z",
  "updated_at":"2016-05-23T21:08:16.503Z",
  "balance": null,
  "balance_date": null,
  "test":true
}
```

Creates a new bank account and associates it with a certificate.

### HTTP Request

`POST https://api.bankson.fi/bankaccounts`

### JSON parameters

Parameter | Description
--------- | -----------
bic       | BIC code of bank
iban | IBAN of the account to be added
certificate_id | id of the certificate associated by
contract_id | The identification given by the bank for services like CAMT

## Delete bank account

```shell
curl "https://api.bankson.fi/bankaccounts/5" -X DELETE
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

> Empty response, HTTP Status code 204

Deletes a bank account.

### HTTP Request

`DELETE https://api.bankson.fi/bankaccounts/:id`
