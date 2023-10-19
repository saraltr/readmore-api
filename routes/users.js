const routes = require("express").Router();
const usersController = require("../controllers/user");

routes.post("/", usersController.registerUser);
routes.put("/:userId", usersController.updateUser);
routes.delete("/userId", usersController.deleteUser);

module.exports = routes;