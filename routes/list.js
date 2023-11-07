const routes = require("express").Router();
const listController = require("../controllers/list");

// validator
const { bookSchema } = require("../schema/booksSchema");
const { validate, validateId } = require("../middlewares/validator");

routes.get("/", listController.getList);
routes.get("/title/:title", listController.getChallenge);
routes.get("/:id", validateId, listController.getById);

module.exports = routes;