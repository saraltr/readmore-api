const dotenv = require("dotenv");
dotenv.config();

// import the MongoClient class from the mongodb library
const { MongoClient } = require("mongodb");

// stores the db connection
let db;

// initialize the  connection
async function initDb(callback) {
  // check if the 'db' variable is already set 
  if (db) {
    console.log("Database is already initialized!");
    return callback(null, db);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    // stores the connection 
    db = client;
    callback(null, db);
  } catch (err) {
    // if an error occurs during the connection, pass it to the callback
    callback(err);
  }
}

// get the db connection
function getDb() {
  // check if the db variable is not set 
  if (!db) {
    // error indicating that the database is not initialized
    throw new Error("Database not initialized");
  }
  // return the existing connection
  return db;
}

module.exports = {
  initDb,
  getDb,
};
