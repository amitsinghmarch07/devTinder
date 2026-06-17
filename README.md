add npm validator to do schema level validation
added npm dotenv to safely load .env file

"/login" api added where we are fetch the user and checking the user hashed and entered password

now i have added cookie-parser package and jsonwebtoken package
cookie-parser package is used to parse data of any cookie coming in the request.
 with the help of jwt.sign method i created one token and set it in cookies.
this token is sent when the user is logged in. browser will be saving this cookies.

Any upcoming req will bring this token to backend. firstly we will check if token is valid or not with jwt.verify. once validated we will get userid from that token and use it to fetch details of the user from database.