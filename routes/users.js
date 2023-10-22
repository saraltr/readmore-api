const routes = require("express").Router();
const usersController = require("../controllers/user");

// validator
const { validate, validateId } = require("../middlewares/validator");
const  { userSchema } = require("../schema/usersSchema");

routes.post("/", validate(userSchema), usersController.registerUser);
routes.put("/:id", validate(userSchema), usersController.updateUser);
routes.delete("/:id", usersController.deleteUser);
routes.get("/", usersController.getUsers);

module.exports = routes;
