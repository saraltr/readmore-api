const mongodb = require("../library/connection");
const ObjectId = require("mongodb").ObjectId; 

const getList = async(req, res) => {
    try {
        const result = await mongodb
        .getDb()
        .db()
        .collection("books")
        .find()
        .toArray();

        // set the response content type to JSON and send the result
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getBook = async (req, res) => {
    const bookId = new ObjectId(req.params.id);
  
    try {
      const result = await mongodb
        .getDb()
        .db()
        .collection("books")
        .findOne({ _id: bookId });
  
      if (result) {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Book not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getList,
    getBook
};