const mongodb = require("../library/connection");

const getList = async(req, res) => {
    try {
        const result = await mongodb
        .getDb()
        .db()
        .collection("challenges")
        .find() 
        .toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err)
    }
}

const getChallenge = async (req, res) => {
    try {
      const name = req.params.title;
      const result = await mongodb
        .getDb()
        .db()
        .collection("challenges")
        .findOne({ title: name });
  
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Challenge not found" });
      }
    } catch (err) {
      res.status(500).json(err)
    }
};

const getById = async (req, res) => {
  try {
    const challengeName = req.params.title;
    console.log('Received challengeId:', challengeName); 
    const result = await mongodb
      .getDb()
      .db()
      .collection("challenges")
      .findOne({ name: challengeName })
        .catch((error) => {
        console.error('MongoDB Query Error:', error);
    })

    console.log('Result from MongoDB:', result); // Add this line for logging

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Challenge not found" });
    }
  } catch (err) {
    console.error('Error:', err); // Add this line for logging
    res.status(500).json(err);
  }
};

const addToReadlist = async (req, res) => {

  const id = req.params.id;
  const challenge = await mongodb
    .getDb()
    .db()
    .collection("challenges")
    .findOne({ _id: id });

  if (!challenge) {
    return res.status(404).json({ message: "Challenge not found" });
  }

  // indentifies the user by their auth0 indentifier
  const userSub = req.oidc.user.sub;
  const user = await mongodb
    .getDb()
    .db()
    .collection("users")
    .findOne({ user_id: userSub });

    if (user) {
      // check if the user has a current challenges list; if not, create an empty one
      user.currentChallenges = user.currentChallenges || [];
    
      // check if the challenge is already in the user's current challenges list
      const challengeIndex = user.currentChallenges.findIndex((item) => item.title === challenge.title);
    
      if (challengeIndex === -1) {

        user.currentChallenges.push(challenge);
    
        // update the user with the new current challenges list
        const result = await mongodb
          .getDb()
          .db()
          .collection("users")
          .updateOne({ user_id: userSub }, { $set: { currentChallenges: user.currentChallenges } });
    
        if (result.modifiedCount > 0) {
          res.status(200).json({ message: "Challenge added to Current Challenges successfully" });
        } else {
          res.status(500).json({ error: "Failed to update the Current Challenges list" });
        }
      } else {
        res.status(409).json({ message: "Challenge is already in the Current Challenges list" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
    
};


const addChallenge = async (req, res) => {
  try {
    // check if the user is authenticated
    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication is required to add a challenge" });
    }

    // automatically set the creator field as the authenticated user's username
    const creator = req.oidc.user.nickname; 

    const challenge = {
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      rules: req.body.rules,
      creator: creator,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("challenges")
      .insertOne(challenge);

    if (result.acknowledged) {
      res.status(201).json({ message: "Challenge added successfully", result });
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


const updateChallenge = async (req, res) => {
  try {

    if (!req.oidc.isAuthenticated()) {
      return res.status(401).json({ error: "Authentication is required to update a challenge" });
    }

    const name = req.params.title;
    
    // check if the challenge exists and belongs to the authenticated user
    const existingChallenge = await mongodb
      .getDb()
      .db()
      .collection("challenges")
      .findOne({ title: name, creator: req.oidc.user.nickname });

    if (!existingChallenge) {
      return res.status(404).json({ message: "Challenge not found or you are not authorized to update it" });
    }

    const updatedChallenge = {
      name: req.body.name,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      rules: req.body.rules,
    };

    const result = await mongodb
      .getDb()
      .db()
      .collection("challenges")
      .updateOne({ title: name }, { $set: updatedChallenge });

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Challenge updated successfully" });
    } else {
      res.status(404).json({ message: "Challenge not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteChallenge = async (req, res) => {
    try {
        const name = req.params.title;

        const result = await mongodb
            .getDb()
            .db()
            .collection("challenges")
            .deleteOne({ title: name });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Challenge deleted successfully" });
        } else {
            res.status(404).json({ message: "Challenge not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getList,
    getChallenge,
    addChallenge,
    updateChallenge,
    deleteChallenge,
    addToReadlist,
    getById
};
