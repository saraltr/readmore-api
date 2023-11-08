const mongodb = require("../library/connection");
const bcrypt = require("bcrypt");
const { requiresAuth } = require("express-openid-connect");


const getUsers = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({}, { projection: { "user_id": 0, "_id": 0 } }) 
      .toArray();

    // set the response content type to JSON and send the result
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err)
  }
};

const getUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOne({ username: username },
        {projection: {user_id: 0, _id: 0,}})

      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "user not found" });
      }
  } catch (err) {
    res.status(500).json(err);
  }
};


const userInfo = (req, res) => {
  requiresAuth()
  const user = req.oidc.user;
  // res.send(user);

    // create a custom JSON object
    const userProfile = {
        nickname: user.nickname,
        email: user.email,
        picture: user.picture,
        last_updated: user.updated_at,
    };
    res.json(userProfile);
};

// update user profile
const updateUser = async (req, res) => {
  try {
    
    const userId = req.userId;
    const user = {
      username: req.body.username,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
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

const addToReadlist = async (req, res) => {

  try{
    const bookId = req.userId;
    console.log('Book ID:', bookId); 
      const book = await mongodb
        .getDb()
        .db()
        .collection("books")
        .findOne({ _id: bookId });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // indentifies the user by their auth0 indentifier
    const userSub = req.oidc.user.sub;
    console.log('User ID:', userSub);
    const user = await mongodb
      .getDb()
      .db()
      .collection("users")
      .findOne({ user_id: userSub });

      if (user) {
        // check if the user has a current challenges list; if not, create an empty one
        user.Readlist = user.Readlist || [];
      
        // check if the challenge is already in the user's current challenges list
        const challengeIndex = user.Readlist.findIndex((item) => item.title === challenge.title);
      
        if (challengeIndex === -1) {

          user.Readlist.push(book);
      
          // update the user with the new current challenges list
          const result = await mongodb
            .getDb()
            .db()
            .collection("users")
            .updateOne({ user_id: userSub }, { $set: { Readlist: user.Readlist } });
      
          if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Book added to Read List successfully" });
          } else {
            res.status(500).json({ error: "Failed to update the Current Read list" });
          }
        } else {
          res.status(409).json({ message: "Book is already in the Current Read list" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
  } catch (err) {
    res.status(500).json(err)}
};


module.exports = {
  getUsers,
  updateUser,
  deleteUser,
  userInfo,
  getUsername,
  addToReadlist
};