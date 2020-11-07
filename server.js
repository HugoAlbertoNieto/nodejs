const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  // no slash at the end
  origin: "http://front-end-bucket-inventory.s3-website.eu-west-2.amazonaws.com" //"http://front-end-bucket-inventory.s3.eu-west-2.amazonaws.com"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./app/models');

// I hope you know what your are doing
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.json({ message: "Welcome to the inventory management server." });
});

require("./app/routes/location.routes")(app);
require("./app/routes/sublocation.routes")(app);
require("./app/routes/item.routes")(app);
require("./app/routes/movement.routes")(app);
require("./app/routes/movementitem.routes")(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

