const { auth } = require("express-openid-connect");
const auth0Config = require("../config/auth0-config");

// initialize the authentication middleware
const authMiddleware = auth(auth0Config);

module.exports = authMiddleware;