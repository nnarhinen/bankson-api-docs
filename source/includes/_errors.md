# Errors

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
