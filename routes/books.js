const routes = require("express").Router();
const booksController = require("../controllers/books");

routes.get("/", booksController.getList);
routes.get("/:id", booksController.getBook);

module.exports = routes;