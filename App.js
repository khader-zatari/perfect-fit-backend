require("dotenv/config");
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const authJwt = require("./helper/jwt");
const errorHandler = require("./helper/error-handler");
const api = process.env.API_URL;

// Middleware
//replace bodyparser with it #####delete#####
app.use(express.json()); // analyze the req and the res as JSON
app.use(morgan("tiny")); //used to console log the http request in a good format
app.use(authJwt()); // check if the user has the right token to access out api's
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler); //check if there are any errors...

app.use(cors());
app.options("*", cors());

const usersRoutes = require("./routes/users");
const productsRoutes = require("./routes/products");
const categoriesRoutes = require("./routes/categories");
const ordersRoutes = require("./routes/orders");
const storesRoutes = require("./routes/stores");

app.use(`${api}/users`, usersRoutes); // when i want the begining of that path just rout me to the user router.
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/stores`, storesRoutes);

//connect to the database
mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => {
        console.log("database is ready");
    })
    .catch((err) => {
        console.log(err);
    });
//listen on port 3000

//development
// app.listen(3000, () => {
//     console.log(api);
//     console.log("server is running on http://localhost:3000");
// });

//production

var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Expres is working on port " + port);
});
