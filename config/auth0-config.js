const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

module.exports = {
    authRequired: true, 
    auth0Logout: true, 
    baseURL: port,
    clientID: process.env.CLIENT_ID, // Auth0 Client ID
    issuerBaseURL: process.env.DOMAIN, // Auth0 Domain
    secret: process.env.SECRET, // Auth0 Client Secret
};