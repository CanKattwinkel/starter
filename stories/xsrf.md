# XSFRF Security


- JWT Token contains XSRF Token
- JWT Token is saved in http only cookie
- XSRF Token is also sended as body in login/register response and then stored in localstorage

Result:

Stateless, XSRF safe, multi session capable 
