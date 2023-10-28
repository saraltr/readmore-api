const express = require("express");
const router = express.Router();
const booksRouter = require("./books");
const readRouter = require("./read");
const usersRouter = require("./users");
const { auth } = require("express-openid-connect");
const auth0Config = require("../config/auth0-config");

const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

router.use("/books", booksRouter);
router.use("/read", readRouter);
router.use("/users", auth(auth0Config), usersRouter)

// swagger UI middleware
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;