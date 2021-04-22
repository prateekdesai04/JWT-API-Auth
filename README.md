# JWT-API-Auth
- Learning Authorization using JWT.
- Motive was to authenticate users and then provide them access to resources, hash passwords, learn about private and protected routes, learn about JWT structure.
- Registered users and hashed their passwords using **bcrypt**.
- Provided a login route, after logging in the users were provided a JWT which was valid for 30 mins.
- This JWT was required to access protected routes (here the *post* route).
