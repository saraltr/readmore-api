const mongodb = require("../library/connection");
const ObjectId = require("mongodb").ObjectId;

// register a new user
const registerUser = async (req, res) => {
    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birtday,
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


// login an existing user
// const loginUser = async (req, res) => {
//   // user authentication logic
// };

// update user profile
const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthday: req.body.birtday,
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
  loginUser,
  updateUser,
  deleteUser,
};