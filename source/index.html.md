---
title: API Reference

language_tabs:
  - shell
  - javascript
  - python

toc_footers:
  - <a href='http://www.bankson.fi'>Bankson home page</a>
  - <a href='https://app.bankson.fi'>Sign Up for Bankson</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors
  - schemas

search: true
---

# Introduction

Welcome to Bankson API! This documentation describes the endpoints Bankson offers. Samples for calling the API are given both with raw curl commands
as well with the official [Node.js](https://github.com/banksonfi/bankson-js).and [Python](https://github.com/banksonfi/bankson-python) libraries.


You can view code examples in the dark area to the right.

# Authentication

> To authorize, use this code:

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});

// Or with API keys

var client = new Client({
  apiKey: '<my-api-key-uuid>',
  privateKey: 'BEGIN RSA PRIVATE KEY....'
});
```

```shell
# With shell, you can just pass the correct header with each request
curl https://api.bankson.fi
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
```

> Make sure to replace `4fc79757419b539937b94f1bd0f6e315765bbde4` with the bearer token obtained by Oauth2.

All requests must include the `Authorization` header to identify the requests. You can either use
API keys added per user from settings or using OAuth2.

### API Keys

First add API key in [Bankson settings](https://app.bankson.fi/settings/apikeys). Make sure to save
the private key securely, it won't be stored anywhere by Bankson.

Use the private key to sign the API key for requests. Then add it to `Authorization`
header: `Authorization: BanksonRSA ApiKey=<apikey>, Timestamp=<unixepoch>, Signature=<sha256 base64 encoded>`

### OAuth2

Authorization is based on OAuth2 specification. The grant types used are `authorization_code` and `refresh_token`.

The endpoints are `https://www.bankson.fi/oauth/authorize` for showing the authorization dialog to the user and `https://www.bankson.fi/oauth/token` for fetching `access_token` and `refresh_token`.

# Testing

> List certificates in test environment

```shell
curl "https://api.bankson.fi/api/certificates"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "X-Bankson-Environment: Test"
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4',
  test: true
});
client.certificates.fetch().then(function(certificates) {
  // Do something with certificates
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata, test=True)
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.me().then(function(resp) {
  console.log('Current user', resp.user);
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.me()
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.certificates.fetch().then(function(certificates) {
  // do something with certificates
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.certirifcates.list()
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

```javascript
var Client = require('bankson-js')
  , fs = require('fs');

var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.certificates.upload(
  fs.createReadStream('WSNDEA1234.p12'),
  { customer_id: '11111111', target_id: '11111111A1', pin: 'WSNDEA1234', bic: 'NDEAFIHH' }
}).then(function(certificate) {
  // certificate uploaded
});
```


```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.certificates.upload(open('WSNDEA1234.p12', 'rb'), { 'customer_id': '11111111', 'target_id': '11111111A1', 'pin': 'WSNDEA1234', 'bic': 'NDEAFIHH' })
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.certificates.request({
  customer_id: '11111111',
  target_id: '11111111A1',
  transfer_key1: '1234567890',
  bic: 'NDEAFIHH'
}).then(function(certificates) {
  // might be multiple certificates
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.certificates.request({
    'customer_id': '11111111',
    'target_id': '11111111A1',
    'transfer_key1', '1234567890',
    bic: 'NDEAFIHH'
})
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.certificates.remove(2).then(function() {
  // certificate deleted
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.certificates.remove(2)
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.certificates.renew(4).then(function(certificate) {
  // Certificate renewed
});

// If certificate has already expired, provide new transferkeys as second parameter to renew()
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.certificates.renew(4)
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.bankAccounts.fetch().then(function(bankAccounts) {
  // List
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.bankaccounts.list()
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.bankAccounts.create({
  bic: 'NDEAFIHH',
  iban: 'FI4819503000000010',
  certificate_id: 1,
  contract_id: '1234'
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.bankaccounts.create({ 'bic': 'NDEAFIHH', 'iban': 'FI4819503000000010', 'certificate_id': 1, 'contract_id': '1234' })
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

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.bankAccounts.remove(5).then(function() {
  // Bank accoutn deleted
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.bankaccounts.remove(5)
```

> Empty response, HTTP Status code 204

Deletes a bank account.

### HTTP Request

`DELETE https://api.bankson.fi/bankaccounts/:id`

# Bank account statements

## List statements

```shell
curl "https://api.bankson.fi/bankaccountstatements"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.bankAccountStatements.fetch().then(function(statements) {
  // Do something
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.bankaccountstatements.list()
```

> JSON response

```json
[
  {
    "id":1,
    "environment_id":1,
    "bank_account_id":1,
    "from":"2006-03-02T22:00:00.000Z",
    "to":"2006-03-02T22:00:00.000Z",
    "legal_sequence_number":"043",
    "entries":[
      {
        "entry_reference":1,
        "archive_id":"060303258877C24002",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":2205.6,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Hyvityslasku",
        "amount":-3205.6,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "HYVITYSLASKU 2425"
        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Lasku",
        "amount":3200,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"800056124147",
        "additional_information":[

        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Lasku",
        "amount":2211.2,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"800056124150",
        "additional_information":[

        ]
      },
      {
        "entry_reference":2,
        "archive_id":"060303258877A26324",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":3695,
        "receiver":"LUMILINNA KY",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":3,
        "archive_id":"060303258877A22357",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":2229.3,
        "receiver":"PELTOLA PEKKA OY",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "LASKUT 3278/3251/4836"
        ]
      },
      {
        "entry_reference":4,
        "archive_id":"0603032584SM020048",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-02",
        "payment_date":"2006-03-03",
        "booking_information":"780Zero Balancing",
        "amount":10364.87,
        "receiver":"ABC-KONSERNI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "CMZ/0036540000 /5400"
        ]
      },
      {
        "entry_reference":5,
        "archive_id":"0603032588WWNG0370",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":256.75,
        "receiver":"PELTOLA LIISA",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "LASKU 3265/HYVITYSLASKU 777"
        ]
      },
      {
        "entry_reference":6,
        "archive_id":"0603032584SM010117",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-03",
        "payment_date":"2006-03-03",
        "booking_information":"710Nordea maksu",
        "amount":1130.91,
        "receiver":"US IRON AND STEEL",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "2584SMM0849971 /RFB/WT0000626289 000049302611118 MAKSAJAN ILMOITTAMA SAAJAN NIMI: NORTH CASTLE'S IRONHOUSE TORPANKATU 1111 PL 999 99999 POHJANLINNA FINLAND",
          "LÄHETTÄJÄN OSOITE: 1239 EAST CIRCLESTREET PO BOX55/5 8877"
        ]
      },
      {
        "entry_reference":7,
        "archive_id":"060303258873A20009",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"704Suoraveloituspalvelu",
        "amount":2120.68,
        "receiver":"",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":8,
        "archive_id":"060303258874A35319",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"703Maksupäätepalvelu",
        "amount":5219,
        "receiver":"POHJANLINNAN RAUTATALO",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "OSTOT    111 KPL            5219,00 OIK.       0 KPL               0,00",
          "TILITYSERÄ 0120070"
        ]
      },
      {
        "entry_reference":9,
        "archive_id":"0603032584LV143623",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-03",
        "payment_date":"2006-03-03",
        "booking_information":"720Tilisiirto",
        "amount":-81.1,
        "receiver":"ABC-KONSERNI",
        "receiver_account":"19503000001414",
        "reference_number":"",
        "additional_information":[
          "00000324510099418709",
          "001311     REC:5",
          "MAKSAJAN ILMOITTAMA SAAJAN NIMI: C/O ABCDEF GROUP OY"
        ]
      }
    ],
    "balances":[
      {
        "booking_date":"2006-03-02",
        "amount":30838.49
      },
      {
        "bookingDate":"2006-03-03",
        "amount":4409.27,
        "availableAmount":0
      }
    ],
    "created_at":"2016-05-24T22:45:48.672Z",
    "updated_at":"2016-05-24T22:45:48.672Z",
    "servicer_name":"Nordea Pankki Suomi Oyj Y-tunn 1680235-8",
    "servicer_bic":"NDEAFIHH",
    "account_owner_name":"POHJANLINNAN RAUTATALO",
    "currency":"EUR",
    "test":true,
    "bank_account":{
      "id":1,
      "certificate_id":1,
      "environment_id":1,
      "iban":"FI4819503000000010",
      "bic":"NDEAFIHH",
      "contract_id":"11111111",
      "created_at":"2016-05-23T21:08:16.503Z",
      "updated_at":"2016-05-23T21:08:16.503Z",
      "balance":null,
      "balance_date":null,
      "test":true
    }
  }
]
```

Fetches bank account statements from Bankson

### HTTP request

`GET https://api.bankson.fi/bankaccountstatements`

## Fetch bank account statements from bank

```shell
curl "https://api.bankson.fi/bankaccountstatements" -X POST
  -H "Authorization: Beare 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "Content-Type: application/json"
  -d '{ "certificate_id": 1 }'
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
var certificateId = 1;
client.bankAccountStatements.refresh(certificateId).then(function(statements) {
  console.log('new statements', statements);
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
certificate_id = 1
client.bankaccountstatements.refresh(certificate_id)
```

> JSON response

```json
[
  {
    "id":1,
    "environment_id":1,
    "bank_account_id":1,
    "from":"2006-03-02T22:00:00.000Z",
    "to":"2006-03-02T22:00:00.000Z",
    "legal_sequence_number":"043",
    "entries":[
      {
        "entry_reference":1,
        "archive_id":"060303258877C24002",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":2205.6,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Hyvityslasku",
        "amount":-3205.6,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "HYVITYSLASKU 2425"
        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Lasku",
        "amount":3200,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"800056124147",
        "additional_information":[

        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Lasku",
        "amount":2211.2,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"800056124150",
        "additional_information":[

        ]
      },
      {
        "entry_reference":2,
        "archive_id":"060303258877A26324",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":3695,
        "receiver":"LUMILINNA KY",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":3,
        "archive_id":"060303258877A22357",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":2229.3,
        "receiver":"PELTOLA PEKKA OY",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "LASKUT 3278/3251/4836"
        ]
      },
      {
        "entry_reference":4,
        "archive_id":"0603032584SM020048",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-02",
        "payment_date":"2006-03-03",
        "booking_information":"780Zero Balancing",
        "amount":10364.87,
        "receiver":"ABC-KONSERNI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "CMZ/0036540000 /5400"
        ]
      },
      {
        "entry_reference":5,
        "archive_id":"0603032588WWNG0370",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":256.75,
        "receiver":"PELTOLA LIISA",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "LASKU 3265/HYVITYSLASKU 777"
        ]
      },
      {
        "entry_reference":6,
        "archive_id":"0603032584SM010117",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-03",
        "payment_date":"2006-03-03",
        "booking_information":"710Nordea maksu",
        "amount":1130.91,
        "receiver":"US IRON AND STEEL",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "2584SMM0849971 /RFB/WT0000626289 000049302611118 MAKSAJAN ILMOITTAMA SAAJAN NIMI: NORTH CASTLE'S IRONHOUSE TORPANKATU 1111 PL 999 99999 POHJANLINNA FINLAND",
          "LÄHETTÄJÄN OSOITE: 1239 EAST CIRCLESTREET PO BOX55/5 8877"
        ]
      },
      {
        "entry_reference":7,
        "archive_id":"060303258873A20009",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"704Suoraveloituspalvelu",
        "amount":2120.68,
        "receiver":"",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":8,
        "archive_id":"060303258874A35319",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"703Maksupäätepalvelu",
        "amount":5219,
        "receiver":"POHJANLINNAN RAUTATALO",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "OSTOT    111 KPL            5219,00 OIK.       0 KPL               0,00",
          "TILITYSERÄ 0120070"
        ]
      },
      {
        "entry_reference":9,
        "archive_id":"0603032584LV143623",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-03",
        "payment_date":"2006-03-03",
        "booking_information":"720Tilisiirto",
        "amount":-81.1,
        "receiver":"ABC-KONSERNI",
        "receiver_account":"19503000001414",
        "reference_number":"",
        "additional_information":[
          "00000324510099418709",
          "001311     REC:5",
          "MAKSAJAN ILMOITTAMA SAAJAN NIMI: C/O ABCDEF GROUP OY"
        ]
      }
    ],
    "balances":[
      {
        "booking_date":"2006-03-02",
        "amount":30838.49
      },
      {
        "bookingDate":"2006-03-03",
        "amount":4409.27,
        "availableAmount":0
      }
    ],
    "created_at":"2016-05-24T22:45:48.672Z",
    "updated_at":"2016-05-24T22:45:48.672Z",
    "servicer_name":"Nordea Pankki Suomi Oyj Y-tunn 1680235-8",
    "servicer_bic":"NDEAFIHH",
    "account_owner_name":"POHJANLINNAN RAUTATALO",
    "currency":"EUR",
    "test":true,
    "bank_account":{
      "id":1,
      "certificate_id":1,
      "environment_id":1,
      "iban":"FI4819503000000010",
      "bic":"NDEAFIHH",
      "contract_id":"11111111",
      "created_at":"2016-05-23T21:08:16.503Z",
      "updated_at":"2016-05-23T21:08:16.503Z",
      "balance":null,
      "balance_date":null,
      "test":true
    }
  }
]
```

Updates bank account statements from the bank

### HTTP request

`POST https://api.bankson.fi/bankaccountstatments`

### JSON params

Parameter | Description
--------- | -----------
certificate_id | The certificate to use for bank acount statement refresh

## Show single statement

```shell
curl "https://api.bankson.fi/bankaccountstatements/12"
  -H "Accept: application/json"
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.bankAccountStatements.statementXml(12).then(function(xmlBuffer) {
});
// client.bankAccountStatements.statementHtml(12)...
// client.bankAccountStatements.statementText(12)...
// client.bankAccountStatements.statementPdf(12)...
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.bankaccountstatments.get(12) # json output
client.bankaccountstatments.get(12, 'xml') # XML (if applicable)
client.bankaccountstatments.get(12, 'html') # HTML output
client.bankaccountstatments.get(12, 'pdf').# PDF output
client.bankaccountstatments.get(12, 'text') # TEXT (if applicable)
```

> JSON response

```json
{
    "id":1,
    "environment_id":1,
    "bank_account_id":1,
    "from":"2006-03-02T22:00:00.000Z",
    "to":"2006-03-02T22:00:00.000Z",
    "legal_sequence_number":"043",
    "entries":[
      {
        "entry_reference":1,
        "archive_id":"060303258877C24002",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":2205.6,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Hyvityslasku",
        "amount":-3205.6,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "HYVITYSLASKU 2425"
        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Lasku",
        "amount":3200,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"800056124147",
        "additional_information":[

        ]
      },
      {
        "entry_reference":1,
        "archive_id":"",
        "booking_date":"2006-03-03",
        "value_date":"0000-00-00",
        "payment_date":"2006-03-03",
        "booking_information":"710Lasku",
        "amount":2211.2,
        "receiver":"RUUVI JA MUTTERI",
        "receiver_account":"",
        "reference_number":"800056124150",
        "additional_information":[

        ]
      },
      {
        "entry_reference":2,
        "archive_id":"060303258877A26324",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":3695,
        "receiver":"LUMILINNA KY",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":3,
        "archive_id":"060303258877A22357",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":2229.3,
        "receiver":"PELTOLA PEKKA OY",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "LASKUT 3278/3251/4836"
        ]
      },
      {
        "entry_reference":4,
        "archive_id":"0603032584SM020048",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-02",
        "payment_date":"2006-03-03",
        "booking_information":"780Zero Balancing",
        "amount":10364.87,
        "receiver":"ABC-KONSERNI",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "CMZ/0036540000 /5400"
        ]
      },
      {
        "entry_reference":5,
        "archive_id":"0603032588WWNG0370",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"710Pano",
        "amount":256.75,
        "receiver":"PELTOLA LIISA",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "LASKU 3265/HYVITYSLASKU 777"
        ]
      },
      {
        "entry_reference":6,
        "archive_id":"0603032584SM010117",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-03",
        "payment_date":"2006-03-03",
        "booking_information":"710Nordea maksu",
        "amount":1130.91,
        "receiver":"US IRON AND STEEL",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "2584SMM0849971 /RFB/WT0000626289 000049302611118 MAKSAJAN ILMOITTAMA SAAJAN NIMI: NORTH CASTLE'S IRONHOUSE TORPANKATU 1111 PL 999 99999 POHJANLINNA FINLAND",
          "LÄHETTÄJÄN OSOITE: 1239 EAST CIRCLESTREET PO BOX55/5 8877"
        ]
      },
      {
        "entry_reference":7,
        "archive_id":"060303258873A20009",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"704Suoraveloituspalvelu",
        "amount":2120.68,
        "receiver":"",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[

        ]
      },
      {
        "entry_reference":8,
        "archive_id":"060303258874A35319",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-06",
        "payment_date":"2006-03-03",
        "booking_information":"703Maksupäätepalvelu",
        "amount":5219,
        "receiver":"POHJANLINNAN RAUTATALO",
        "receiver_account":"",
        "reference_number":"",
        "additional_information":[
          "OSTOT    111 KPL            5219,00 OIK.       0 KPL               0,00",
          "TILITYSERÄ 0120070"
        ]
      },
      {
        "entry_reference":9,
        "archive_id":"0603032584LV143623",
        "booking_date":"2006-03-03",
        "value_date":"2006-03-03",
        "payment_date":"2006-03-03",
        "booking_information":"720Tilisiirto",
        "amount":-81.1,
        "receiver":"ABC-KONSERNI",
        "receiver_account":"19503000001414",
        "reference_number":"",
        "additional_information":[
          "00000324510099418709",
          "001311     REC:5",
          "MAKSAJAN ILMOITTAMA SAAJAN NIMI: C/O ABCDEF GROUP OY"
        ]
      }
    ],
    "balances":[
      {
        "booking_date":"2006-03-02",
        "amount":30838.49
      },
      {
        "bookingDate":"2006-03-03",
        "amount":4409.27,
        "availableAmount":0
      }
    ],
    "created_at":"2016-05-24T22:45:48.672Z",
    "updated_at":"2016-05-24T22:45:48.672Z",
    "servicer_name":"Nordea Pankki Suomi Oyj Y-tunn 1680235-8",
    "servicer_bic":"NDEAFIHH",
    "account_owner_name":"POHJANLINNAN RAUTATALO",
    "currency":"EUR",
    "test":true,
    "bank_account":{
      "id":1,
      "certificate_id":1,
      "environment_id":1,
      "iban":"FI4819503000000010",
      "bic":"NDEAFIHH",
      "contract_id":"11111111",
      "created_at":"2016-05-23T21:08:16.503Z",
      "updated_at":"2016-05-23T21:08:16.503Z",
      "balance":null,
      "balance_date":null,
      "test":true
    }
  }
```

Shows one statement. You can use the `Accept` header to control the output format. Valid values are:

 - application/json
 - text/xml (CAMT format)
 - text/plain (TITO format)
 - application/pdf

### HTTP request

`GET https://api.bankson.fi/bankaccountstatements/:id`

# Payments

## List payments

```shell
curl "https://api.bankson.fi/payments"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.payments.list().then(function(payments) {
  // Payments
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.payments.list()
```

> JSON response

```json
[{
  "id": 1,
  "bank_account_id": 5,
  "environment_id": 2,
  "amount": 608.3,
  "recipient_name": "Työeläkeyhtiö Elo",
  "recipient_iban": "FI2721533800005022",
  "recipient_bic": "NDEAFIHH",
  "payment_date": "2014-12-04",
  "reference_number": "13",
  "vendor_reference": "23",
  "end_to_end_id": "1417712682855-G-1-P-1",
  "payment_information_id": "1417712682855-G-1",
  "message_id": "1417712682855",
  "created_at": "2014-12-04T17:04:44.102Z",
  "updated_at": "2014-12-04T17:04:44.102Z",
  "status": null,
  "status_details": null,
  "test": false,
  "bank_account": {
    "id": 5,
    "certificate_id": 14,
    "environment_id": 2,
    "iban": "FI4819503000000010",
    "bic": "NDEAFIHH",
    "contract_id": "111111111",
    "created_at": "2014-12-04T17:04:11.906Z",
    "updated_at": "2014-12-04T17:04:11.906Z",
    "balance": null,
    "balance_date": null,
    "test": false
  }
}]
```

Lists all payments made through Bankson.

`payment.status` can be one of values:

 * `null` - no payment status available, use the `POST /payments/feedback` endpoint to refresh
 * `ACTC` - the payment request is accepted by the bank with a technical check
 * `ACCP` - the payment has been checked for formal validity
 * `ACSP` - the payment has been processed
 * `PNDG` - the payment is pending for processing
 * `RJCT` - the bank has rejected the payment, more information can be found from the `payment.status_details` field

### HTTP Request

`GET https://api.bankson.fi/payments`

## Add payment

```shell
curl "https://api.bankson.fi/payments" -X POST
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "Content-Type: application/json"
  -d '{"amount":308.3,"recipient_name":"Työeläkeyhtiö Elo","recipient_iban":"FI2721533800005022","recipient_bic":"NDEAFIHH","payment_date":"2014-12-04","reference_number":"13","vendor_reference":"23","from":{"iban":"FI4819503000000010","bic":"NDEAFIHH"}}'
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.payments.create({
  amount: 308.3,
  recipient_name: 'Työeläkeyhtiö Elo',
  recipient_iban: 'FI2721533800005022',
  recipient_bic: 'NDEAFIHH',
  payment_date: '2014-12-04',
  reference_number: '13',
  vendor_reference: '23' // Free form string, can be used to identify payments with your own system
}, { // From which account payment will be made
  iban: 'FI4819503000000010',
  bic: 'NDEAFIHH'
}).then(function(payment) {
  // Payment created and sent to bank
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.payments.create({
    'amount': 308.3,
    'recipient_name': 'Työeläkeyhtiö Elo',
    'recipient_iban': 'FI2721533800005022',
    'recipient_bic': 'NDEAFIHH',
    'payment_date': '2014-12-04',
    'reference_number': '13',
    'vendor_reference': '23' # Free form string, can be used to identify payments with your own system
}, { # From which account payment will be made
    'iban': 'FI4819503000000010',
    'bic': 'NDEAFIHH'
})
```


> JSON response (http status code `201 Created`)

```json
{
  "id": 1,
  "bank_account_id": 5,
  "environment_id": 2,
  "amount": 608.3,
  "recipient_name": "Työeläkeyhtiö Elo",
  "recipient_iban": "FI2721533800005022",
  "recipient_bic": "NDEAFIHH",
  "payment_date": "2014-12-04",
  "reference_number": "13",
  "vendor_reference": "23",
  "end_to_end_id": "1417712682855-G-1-P-1",
  "payment_information_id": "1417712682855-G-1",
  "message_id": "1417712682855",
  "created_at": "2014-12-04T17:04:44.102Z",
  "updated_at": "2014-12-04T17:04:44.102Z",
  "status": null,
  "status_details": null,
  "test": false,
  "bank_account": {
    "id": 5,
    "certificate_id": 14,
    "environment_id": 2,
    "iban": "FI4819503000000010",
    "bic": "NDEAFIHH",
    "contract_id": "111111111",
    "created_at": "2014-12-04T17:04:11.906Z",
    "updated_at": "2014-12-04T17:04:11.906Z",
    "balance": null,
    "balance_date": null,
    "test": false
  }
}
```

Sends payment to bank and stores into bankson.

### HTTP request

`POST https://api.bankson.fi/payments`

### JSON Schema

[Payment](/#schema-payment)

## Update payment statuses

```shell
curl "https://api.bankson.fi/payments/feedback" -X POST
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
client.payments.fetchFeedback().then(function() {
  // Payments updated with current status
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
client.payments.refresh()
```

> JSON response

```json
{
  "message": "OK"
}
```

Updates payment status from bank for all pending payments.

# Inbound Payments (Reference payments)

## List inbound payments

```shell
curl "https://api.bankson.fi/inboundpayments"
  -H "Authorization: Bearer 4fc79757419b539937b94f1bd0f6e315765bbde4"
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
var opts = { // for filtering results
  //reference_number: '13'
  //since: '2016-05-10'
};
client.inboundPayments.fetch(opts).then(function(payments) {
  // Payments
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
# optional filter parameters
# opts = { 'reference_number': '13', 'since': '2016-10-10' }
client.inboundpayments.list(opts)
```

> JSON response

```json
[{
  "id": 266,
  "bank_account_id": 22,
  "environment_id": 2,
  "amount": 64.9,
  "debitor_name": "MYYRY VILJO",
  "payment_date": "2006-03-03",
  "archive_id": "03032950PS120058",
  "booking_date": "2006-03-02T22:00:00.000Z",
  "reference_number": "890948",
  "created_at": "2016-06-02T17:14:20.299Z",
  "updated_at": "2016-06-02T17:14:20.299Z",
  "inbound_payment_batch_id": 19,
  "test": true,
  "bank_account": {
    "id": 22,
    "certificate_id": 26,
    "environment_id": 2,
    "iban": "FI4819503000000010",
    "bic": "NDEAFIHH",
    "contract_id": null,
    "created_at": "2016-05-21T21:50:11.800Z",
    "updated_at": "2016-05-21T21:50:11.800Z",
    "balance": null,
    "balance_date": null,
    "test": true
  }
},{
  "id": 316,
  "bank_account_id": 22,
  "environment_id": 2,
  "amount": 40,
  "debitor_name": "COPPERHOUSE",
  "payment_date": "2006-03-06",
  "archive_id": "0306258877B40058",
  "booking_date": "2006-03-05T22:00:00.000Z",
  "reference_number": "890948",
  "created_at": "2016-06-02T17:14:20.952Z",
  "updated_at": "2016-06-02T17:14:20.952Z",
  "inbound_payment_batch_id": 21,
  "test": true,
  "bank_account": {
    "id": 22,
    "certificate_id": 26,
    "environment_id": 2,
    "iban": "FI4819503000000010",
    "bic": "NDEAFIHH",
    "contract_id": null,
    "created_at": "2016-05-21T21:50:11.800Z",
    "updated_at": "2016-05-21T21:50:11.800Z",
    "balance": null,
    "balance_date": null,
    "test": true
  }
}]
```

Lists all received reference payments

### HTTP Request

`GET https://api.bankson.fi/inboundpayments`

### Query parameters

The result set can be filtered by query parameters

Parameter        | Description
---------------- | ------------------------------------------------
reference_number | Only show payments matching the reference number
since            | Only show payments newer thant provided timestamp

## Refresh payments from bank

```shell
curl "https://api.bankson.fi/inboundpayments" -X POST
  -H "Authorization: Beare 4fc79757419b539937b94f1bd0f6e315765bbde4"
  -H "Content-Type: application/json"
  -d '{ "certificate_id": 1 }'
```

```javascript
var Client = require('bankson-js');
var client = new Client({
  bearerToken: '4fc79757419b539937b94f1bd0f6e315765bbde4'
});
var certificateId = 1;
client.inboundPayments.refresh(certificateId).then(function(payments) {
  console.log('new payments', payments);
});
```

```python
from bankson import Bankson, RequestError

with open('/path/to/private_key_file') as privatefile:
  keydata = privatefile.read()
client = Bankson(api_key='<api key uuid>', private_key=keydata)
certificate_id = 1
client.inboundpayments.refresh(certificate_id)
```

> JSON response


```json
[{
  "id": 266,
  "bank_account_id": 22,
  "environment_id": 2,
  "amount": 64.9,
  "debitor_name": "MYYRY VILJO",
  "payment_date": "2006-03-03",
  "archive_id": "03032950PS120058",
  "booking_date": "2006-03-02T22:00:00.000Z",
  "reference_number": "890948",
  "created_at": "2016-06-02T17:14:20.299Z",
  "updated_at": "2016-06-02T17:14:20.299Z",
  "inbound_payment_batch_id": 19,
  "test": true,
  "bank_account": {
    "id": 22,
    "certificate_id": 26,
    "environment_id": 2,
    "iban": "FI4819503000000010",
    "bic": "NDEAFIHH",
    "contract_id": null,
    "created_at": "2016-05-21T21:50:11.800Z",
    "updated_at": "2016-05-21T21:50:11.800Z",
    "balance": null,
    "balance_date": null,
    "test": true
  }
},{
  "id": 316,
  "bank_account_id": 22,
  "environment_id": 2,
  "amount": 40,
  "debitor_name": "COPPERHOUSE",
  "payment_date": "2006-03-06",
  "archive_id": "0306258877B40058",
  "booking_date": "2006-03-05T22:00:00.000Z",
  "reference_number": "890948",
  "created_at": "2016-06-02T17:14:20.952Z",
  "updated_at": "2016-06-02T17:14:20.952Z",
  "inbound_payment_batch_id": 21,
  "test": true,
  "bank_account": {
    "id": 22,
    "certificate_id": 26,
    "environment_id": 2,
    "iban": "FI4819503000000010",
    "bic": "NDEAFIHH",
    "contract_id": null,
    "created_at": "2016-05-21T21:50:11.800Z",
    "updated_at": "2016-05-21T21:50:11.800Z",
    "balance": null,
    "balance_date": null,
    "test": true
  }
}]
```

Refreshes all inbound payments from bank.

### HTTP request

`POST https://api.bankson.fi/inboundpayments`

### JSON params

Parameter | Description
--------- | -----------
certificate_id | The certificate to use


