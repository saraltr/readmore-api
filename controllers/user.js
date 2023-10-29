const mongodb = require("../library/connection");
const bcrypt = require("bcrypt");

// register a new user
const registerUser = async (req, res) => {
  try {
    // convert to ISO format
    const originalDate = req.body.birthday; 
    const parts = new Date(originalDate).toISOString().split("T");
    const newDate = parts[0];

    // Extract user data from the request
    const { username, email, password, firstName, lastName, birthday } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // create the user object with the hashed password and correct date format
    const user = {
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthday: newDate 
    };

    const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .insertOne(user);

    if (result.acknowledged) {
      res.status(201).json({ message: "Thanks for registering! Your account was created.", result });
    } else {
      res.status(500).json({error: result.error});
    }
  } catch (err) {
    res.status(500).json(err)
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({}, { projection: { "password": 0 } }) // excludex password 
      .toArray();

    // set the response content type to JSON and send the result
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err)
  }
};


// login an existing user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check the user's credentials against the database
    const user = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOne({ username, password });

    if (user) {

      res.status(200).json({ message: "Login successful", user });
    } else {
      // Authentication failed
      res.status(401).json({ message: "Login failed" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// update user profile
const updateUser = async (req, res) => {
  try {

    const originalDate = req.body.birthday; 
    const parts = new Date(originalDate).toISOString().split("T");
    // console.log(parts)
    const newDate = parts[0];

    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const userId = req.userId;
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: newDate,
    }

    const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .replaceOne({ _id: userId }, user);

    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json(err)
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const result = await mongodb
    .getDb()
    .db()
    .collection("users")
    .deleteOne({ _id: userId }, true);

    if (result.acknowledged) {
      res.status(200).send();
    } else {
      res.status(500).json({err: result.err});
    }
  } catch (err) {
    res.status(500).json(err)
  }
};

module.exports = {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
  loginUser
};