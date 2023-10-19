const routes = require("express").Router();
const usersController = require("../controllers/user");

routes.post("/", usersController.registerUser);
routes.put("/:id", usersController.updateUser);
routes.delete("/:id", usersController.deleteUser);
routes.get("/", usersController.getUsers);

module.exports = routes;
