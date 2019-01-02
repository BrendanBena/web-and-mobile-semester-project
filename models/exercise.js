// models/exercise.js
// db model for mongoDB
var db = require("../db");

var Exercise = db.model("Exercise", {
    title: String,
    date: String,
    type: String,
    duration: String,
    weather: String,
    comments: String
});

module.exports = Exercise; 