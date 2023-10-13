const routes = require("express").Router();
const readController = require("../controllers/read")

routes.get("/", readController.getList);
routes.get("/title/:title", readController.getBookByTitle);
routes.get("/:id", readController.getBook);
routes.post("/add/:id", readController.addReadBook);
routes.delete("/:id", readController.removeBook)

module.exports = routes;