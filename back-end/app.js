const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");

require("dotenv/config");

// http://localhost:3000/api/v1/products

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(morgan("tiny"));

const api = process.env.API_URL;
const PORT = 3000;
const URL = `http://localhost:${PORT}`;

app.get(`${api}/products`, (req, res) => {
  // res.send("Hello API");
  const product = {
    id: 1,
    name: "Nike 222",
    image: "some_url",
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log("newProduct: ", newProduct);
  res.send(newProduct);
});

const userName = "eshop-user";
const password = "fgSXK$A7NwE82cT";
const databaseName = "eshop-database";

const URL_MongoDB = `mongodb+srv://${userName}:${password}@cluster0.ey18sdw.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

console.log("CONNECT_STRING: ", process.env.CONNECT_STRING);

mongoose
  .connect(URL_MongoDB, {
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.listen(PORT, () => {
  // console.log("api: ", api);
  console.log("Server is running ", URL);
});
