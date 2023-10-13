const routes = require("express").Router();
const booksController = require("../controllers/books");

routes.get("/", booksController.getList);

module.exports = routes;