const routes = require("express").Router();
const listController = require("../controllers/list");

// validator
const { bookSchema } = require("../schema/booksSchema");
const { validate, validateId } = require("../middlewares/validator");

routes.get("/", listController.getList);
routes.get("/title/:title", listController.getBookByTitle);
routes.get("/:id", validateId, listController.getBook);

module.exports = routes;