const mongodb = require("../library/connection");
const ObjectId = require("mongodb").ObjectId;

const getList = async(req, res) => {
    try {
        const result = await mongodb
        .getDb()
        .db()
        .collection("read")
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
        .collection("read")
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
      .collection("read")
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

// adds a book to the read list from the books (to read list) collection
const addReadBook = async (req, res) => {
  const bookId = req.userId; 
  try {
    const bookDetails = await mongodb
      .getDb()
      .db()
      .collection("books")
      .findOne({ _id: bookId });

    if (!bookDetails) {
      return res.status(404).json({ message: "Book not found" });
    }

    // creates an object with the desired book details
    const bookToAdd = {
      title: bookDetails.title,
      author: bookDetails.author,
      genre: bookDetails.genre,
      nationality: bookDetails.nationality,
      year_of_publication: bookDetails.year_of_publication,
    };

    // add the book to the user's read collection
    const result = await mongodb
      .getDb()
      .db()
      .collection("read")
      .insertOne(bookToAdd);

    if (result.acknowledged) {
      return res.status(201).json({ message: "Book added successfully!" });
    } else {
      return res.status(500).json({ error: "Failed to add the book" });
    }
  } catch (err) {
    return res.status(500).json({ message: "An internal server error occurred" });
  }
};
  
// remove book from the collection
const removeBook = async (req, res) => {
    try {
      const bookId = req.userId;
      const result = await mongodb
      .getDb()
      .db()
      .collection("read")
      .deleteOne({ _id: bookId }, true);

      if (result.acknowledged) {
        res.status(200).send();
      } else {
        res.status(500).json({err: result.err});
      }
    } catch (err) {
      res.status(500).json({message: "An internal server error occurred." })
    }
};


module.exports = {
    getList,
    getBook,
    getBookByTitle,
    addReadBook,
    removeBook
}