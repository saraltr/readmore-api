const routes = require("express").Router();
const booksController = require("../controllers/books");

// validators
const {addBookSchema} = require("../schema/booksSchema");
const validate = require("../middlewares/validator");

routes.get("/", booksController.getList);
routes.get("/title/:title", booksController.getBookByTitle);
routes.get("/:id", booksController.getBook);

routes.post("/", validate(addBookSchema), booksController.addBook);
routes.put("/:id", booksController.updateBook);
routes.delete("/:id", booksController.removeBook);

module.exports = routes;