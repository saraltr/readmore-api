const mongodb = require("../library/connection");

const getList = async(req, res) => {
    try {
        const result = await mongodb
        .getDb()
        .db()
        .collection("challengeslist")
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
        .collection("challengeslist")
        .findOne({ title: name })
        .toArray();
  
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
    const challengeId = req.id;

    const result = await mongodb
      .getDb()
      .db()
      .collection("challengeslist")
      .findOne({ _id: challengeId });

    if (result) {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Challenge not found" });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(err);
  }
};

module.exports = {
    getList,
    getChallenge,
    getById
};