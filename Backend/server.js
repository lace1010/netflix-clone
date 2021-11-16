require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth.js");

let uri = process.env.NETFLIX_CLONE_MONGO_URI;

// Connect to mongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// These 4 lines tell us if we connected successfully or not.
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connection Successful!");
});

// Need bodyParser to use receive and use JSON from database
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(cors());
// Use this to have a route folder that handles all of the routes.
app.use("/api/auth", authRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
