const express = require("express");
const mongoose = require("mongoose");
// import the routes
const authRoute = require("./app/routes/auth");
const shopRoute = require("./app/routes/shop");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// connect to database
const { mongoUserName, password, clusterName, dbName } = process.env;
const mongoDB_URI = `mongodb+srv://${mongoUserName}:${password}@${clusterName}.mongodb.net/${dbName}`;
// console.log(mongoDB_URI);

mongoose
  .connect(mongoDB_URI)
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(`Error connecting to database! `, err));

//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Shop!");
});

// routes
app.use("/auth", authRoute);
app.use("/shop", shopRoute);

app.listen(port, () => console.log("listening on port", port));
