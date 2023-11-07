const routes = require("express").Router();
const challengeControllers = require("../controllers/challenges");
const { validateId } = require("../middlewares/validator");

// Define the route with the `validateId` middleware first
routes.get("/:id", validateId, challengeControllers.getById);

// Then define the route with the title parameter
routes.get("/title/:name", challengeControllers.getChallenge);

// Finally, define any other routes you might have
routes.get("/", challengeControllers.getList);

module.exports = routes;
