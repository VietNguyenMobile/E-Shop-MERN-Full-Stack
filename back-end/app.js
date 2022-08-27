const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

require("dotenv/config");

app.use(cors());
app.options("*", cors());

// Middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

// Routes
const productsRoutes = require("./routers/products");
const ordersRoutes = require("./routers/orders");
const usersRoutes = require("./routers/users");
const categoriesRoutes = require("./routers/categories");

const api = process.env.API_URL;
const PORT = 3000;
const URL = `http://localhost:${PORT}`;

// Routers
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Models
const Product = require("./models/product");
const Order = require("./models/order");
const Category = require("./models/category");
const User = require("./models/user");

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
  console.log("Server is running ", URL);
});
