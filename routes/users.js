const routes = require("express").Router();
const usersController = require("../controllers/user");
const { requiresAuth } = require("express-openid-connect");

// validator
const { validate, validateId } = require("../middlewares/validator");
const  { userSchema } = require("../schema/usersSchema");

routes.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

routes.get('/profile', usersController.userInfo);

routes.post("/", validate(userSchema), usersController.registerUser);
routes.put("/:id", validateId, validate(userSchema), usersController.updateUser);
routes.delete("/:id", validateId, usersController.deleteUser);
routes.get("/all", usersController.getUsers);

module.exports = routes;
