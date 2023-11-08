const express = require("express");
const router = express.Router();
const booksRouter = require("./books");
const readRouter = require("./read");
const usersRouter = require("./users");

const { auth, requiresAuth } = require("express-openid-connect");
const auth0Config = require("../config/auth0-config");

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

const customRoutes = {
  postLogoutRedirect: '/logout',
};

// Apply authentication middleware with customRoutes as configuration
router.use(auth(auth0Config, customRoutes));

router.get('/logout', (req, res) => res.send('Bye!'));

router.get("/", (req, res) => {
    requiresAuth();
    try {
      if (req.oidc.isAuthenticated()) {
        // If the user is logged in
        const username = req.oidc.user.nickname;
        res.status(200).json({ status: 'success', message: `Welcome, ${username}! You are logged in.` });
      } else {
        res.status(200).json({ status: 'success', message: 'Welcome to our Book Club App! Please log in to access our features.' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
});

router.use("/books", booksRouter);
router.use("/read", readRouter);
router.use("/users", usersRouter);

// Swagger UI middleware
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;
