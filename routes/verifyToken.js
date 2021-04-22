const jwt = require('jsonwebtoken');

// This is going to be a middleware function and we can add it to the routes that we want to make private (protected).

module.exports = function (req, res, next) {
  //export it and use it in routes which are to be protected
  const token = req.header('auth-token'); // if it's linked to a front-end then we extract it from the browser's local storage

  if (!token) return res.status(401).send('Access Denied !');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET); // Verify if the JWT in the header is valid and has not been changed by anyone
    req.user = verified; //verified returns the Payload if the token is valid and verified
    next(); // switch contorl back to the route calling this function
  } catch (error) {
    res.status(400).send('Invalid Token !');
  }
};
