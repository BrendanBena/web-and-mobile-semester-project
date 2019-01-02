// db.js
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/workouts", { useNewUrlParser: true });
module.exports = mongoose;