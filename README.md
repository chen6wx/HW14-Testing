# Homework 14

## What are middleware functions in Express.js, and how do they work?

Middleware functions in Express.js are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can perform various tasks such as executing code, modifying the request and response objects, ending the request-response cycle, and calling the next middleware function in the stack.

## What is JWT, and how does it work?

JWT (JSON Web Token) is a compact, URL-safe token for authorization and authenticaiton. It consists of three parts, a header which has the token type and signing algorithm, a payload which has the claims or data needing to be transmitted, and a signature which is created by signing the header and payload with a secret key or a public/private key pair.
It works through the client sends to the server a JWT usually in the Authorisation header of a request. The server will decode and verify the signature of the JWT using the secret key or the public private key, and will process the request if the JWT was valid.

## How do you securely store JWT on the client-side?

You can securely store JWT by using HTTP-only and Secure cookies, this would ensure that the JWT cannot be accesed using JavaScript and it is only sent using HTTPS.

## How does token expiration work in JWT?

Token expiration is handled through a claim in the payload called exp (expiration). This is a timestamp indicating when the token should expire. The server checks this timestamp to determine if the token is still valid.
