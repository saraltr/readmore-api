const routes = require("express").Router();
const challengeControllers = require("../controllers/challenges");
const { validateId } = require("../middlewares/validator");

routes.get("/", challengeControllers.getList);
routes.get("/:name", challengeControllers.getById)

module.exports = routes;
