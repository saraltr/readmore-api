const routes = require("express").Router();
const usersController = require("../controllers/user");
const { auth } = require("express-openid-connect");
const auth0Config = require("../config/auth0-config");

// validator
const { validate, validateId } = require("../middlewares/validator");
const  { userSchema } = require("../schema/usersSchema");

// register a new user
routes.post("/", validate(userSchema), usersController.registerUser);

routes.use(auth(auth0Config));

// login an existing user
routes.post("/logged", usersController.loginUser);

routes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Logout route
routes.get("/logout", (req, res) => {
    req.oidc.logout();
    res.redirect("/"); // Redirect to the desired URL after logout
});

// routes.get("/logout", (req, res) => {
//     req.oidc.logout(); // Log the user out
//     res.redirect("/"); // Redirect to the root URL or any other desired URL after logout
// });

// update user profile
routes.put("/:id", validateId, validate(userSchema), usersController.updateUser);

// delete user
routes.delete("/:id", validateId, usersController.deleteUser);

// get a list of users
routes.get("/all", usersController.getUsers);

module.exports = routes;