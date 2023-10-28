const express = require("express");
const cors = require("cors");
const { initDb } = require('./library/connection');

const app = express();
const port = process.env.PORT || 3000;

// middleware
app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Content-Type", "application/json");
    next();
  });

// routes
app.use("/", require("./routes"));

app.listen(port, () => {
    console.log(`Web Server is listening at port ${port}`);
});

initDb((err) => {
    if (err) {
      console.error("Error connecting to the database:", err);
    } else {
      console.log("Connected to MongoDB");
    }
});