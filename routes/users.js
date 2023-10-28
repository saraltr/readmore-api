const routes = require("express").Router();
const usersController = require("../controllers/user");
const { auth } = require("express-openid-connect");
const auth0Config = require("../config/auth0-config");

// validator
const { validate, validateId } = require("../middlewares/validator");
const  { userSchema } = require("../schema/usersSchema");

// Define authentication routes with 'auth' middleware
routes.use(auth(auth0Config));

// Authenticated route
routes.get("/", (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

routes.post("/", validate(userSchema), usersController.registerUser);
routes.post("/:logged", usersController.loginUser);
routes.put("/:id", validateId, validate(userSchema), usersController.updateUser);
routes.delete("/:id", validateId, usersController.deleteUser);
routes.get("/:all", usersController.getUsers);

module.exports = routes;
