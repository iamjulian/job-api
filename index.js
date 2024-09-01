const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");

// hosted database connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@job-portal.owls5.mongodb.net/`;
// mongoose.connect(uri).then(() => {
//   console.log(`Successfully connected to database`.blue.bold);
// });

//Local database connection
const localUri = `mongodb://localhost:27017/${process.env.TOKEN_KEY}`;
mongoose.connect(localUri,{useNewUrlParser: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'database connection error:'));
db.once('open', () => {console.log(`Successfully connected to database`.blue.bold);});

// server
const port = process.env.PORT || 5000;
const crypto = require("crypto");
app.listen(port, () => {
  console.log(`http://localhost:${port}`.yellow.bold);
});
