const routes = require("express").Router();
const usersController = require("../controllers/user");

// validator
const { validate, validateId } = require("../middlewares/validator");
const  { userSchema } = require("../schema/usersSchema");

routes.get('/profile', usersController.userInfo);

routes.put("/:id", validateId, validate(userSchema), usersController.updateUser);
routes.delete("/:id", validateId, usersController.deleteUser);
routes.get("/", usersController.getUsers);
routes.get("/username/:username", usersController.getUsername);

module.exports = routes;