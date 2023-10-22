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

// get a book by its id
const getBook = async (req, res) => {
    const bookId = req.userId; 
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

// get a book by its title
const getBookByTitle = async (req, res) => {
    const bookTitle = req.params.title;
  
    try {
      const result = await mongodb
        .getDb()
        .db()
        .collection("books")
        .findOne({ title: bookTitle });
  
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

// create a book entry  in the database
const addBook = async (req, res) => {

    try {
      // extract book information from the request body
      const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        nationality: req.body.nationality,
        year_of_publication: req.body.year_of_publication
      };
  
      const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .insertOne(book);
  
      if (result.acknowledged) {
        res.status(201).json({ message: "Book added successfully", result });
      } else {
        res.status(500).json({error: result.error});
      }
    } catch (error) {
      res.status(500).json({message: error.message})
    }
};

// update an existing book
const updateBook = async (req, res) => {
    try {
      const bookId = req.userId;
      const book = {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        nationality: req.body.nationality,
        year_of_publication: req.body.year_of_publication
      };
  
      const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .replaceOne({ _id: bookId }, book);
  
      if (result.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: result.error });
      }
    } catch (error) {
      res.status(500).json({message: error.message})
    }
};

// remove book from the db
const removeBook = async (req, res) => {
    try {
      const bookId = req.userId;
      const result = await mongodb
      .getDb()
      .db()
      .collection("books")
      .deleteOne({ _id: bookId }, true);

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
    getList,
    getBook,
    getBookByTitle,
    addBook,
    updateBook,
    removeBook
};