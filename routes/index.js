const express = require("express");
const router = express.Router();
const booksRouter = require("./books");
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

router.use("/books", booksRouter);

// swagger UI middleware
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

module.exports = router;