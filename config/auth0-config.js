const dotenv = require("dotenv");
dotenv.config();

// determine the base URL based on the environment
let baseURL;
if (process.env.NODE_ENV === "production") {
  // Use the deployed URL when in production
  baseURL = "https://read-list-api.onrender.com/"; 
} else {
  // Use localhost when running locally
  baseURL = "http://localhost:3000/";
}

module.exports = {
  authRequired: false, 
  auth0Logout: true,
  session: {
    //@ts-ignore
    cookie: {
      domain: baseURL
    }
  }, 
  baseURL: baseURL,
  clientID: process.env.CLIENT_ID, // Auth0 Client ID
  issuerBaseURL: process.env.ISSUER_BASE_URL, // Auth0 Domain
  clientSecret: process.env.SECRET, // Auth0 Client Secret
};