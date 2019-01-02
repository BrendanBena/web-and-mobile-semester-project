// server.js
var express = require("express");
var bodyParser = require("body-parser");

// App will be an instance of the express server.
var app = express();

// Serve static files from the public dir
app.use(express.static("public"));

// Create routes to define the API for the app.
var router = express.Router();
router.use(bodyParser.json());
router.use("/api/exercises", require("./api/exercises"));

app.use(router);

// Start the web server on port 3000
app.listen(3000);