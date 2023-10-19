const mongodb = require("../library/connection");
const ObjectId = require("mongodb").ObjectId;


// register a new user
const registerUser = async (req, res) => {
    try {
      // convert to ISO format
      const originalDate = req.body.birthday; 
      const parts = new Date(originalDate).toISOString().split("T");
      const newDate = parts[0];

      const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: newDate,
      }
  
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
    } catch (error) {
      res.status(500).json({message: error.message})
    }
};

const getUsers = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({}, { projection: { "password": 0 } }) // Exclude password if nested
      .toArray();

    // set the response content type to JSON and send the result
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// login an existing user
// const loginUser = async (req, res) => {
//   // user authentication 
// };

// update user profile
const updateUser = async (req, res) => {
  try {

    const originalDate = req.body.birthday; 
    const parts = new Date(originalDate).toISOString().split("T");
    const newDate = parts[0];
    
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
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
    res.status(500).json({message: error.message})
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
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
    res.status(500).json({message: err.message})
  }
};

module.exports = {
  registerUser,
  getUsers,
  updateUser,
  deleteUser,
};