const routes = require("express").Router();
const booksController = require("../controllers/books");

// validator
const { bookSchema } = require("../schema/booksSchema");
const { validate, validateId } = require("../middlewares/validator");

routes.get("/", booksController.getList);
routes.get("/title/:title", booksController.getBookByTitle);
routes.get("/:id", validateId, booksController.getBook);

routes.post("/", validate(bookSchema), booksController.addBook);
routes.put("/:id", validateId, validate(bookSchema), booksController.updateBook);
routes.delete("/:id", validateId, booksController.removeBook);

module.exports = routes;