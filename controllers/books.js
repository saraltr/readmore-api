const mongodb = require("../library/connection");

const getList = async(req, res) => {
    try {
        const result = await mongodb.getDb().db().collection("books").find().toArray();

        // set the response content type to JSON and send the result
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message})
      }
}

module.exports = {
    getList
};