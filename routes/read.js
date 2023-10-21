const routes = require("express").Router();
const readController = require("../controllers/read");
const { validateId } = require("../middlewares/validator");


routes.get("/", readController.getList);
routes.get("/title/:title", readController.getBookByTitle);
routes.get("/:id", validateId, readController.getBook);
routes.post("/add/:id", validateId, readController.addReadBook);
routes.delete("/:id", validateId, readController.removeBook)

module.exports = routes;