const routes = require("express").Router();
const booksController = require("../controllers/books");

routes.get("/", booksController.getList);
routes.get("/title/:title", booksController.getBookByTitle);
routes.get("/:id", booksController.getBook);
routes.post("/", booksController.addBook);
routes.put("/:id", booksController.updateBook);
routes.delete("/:id", booksController.removeBook);

module.exports = routes;