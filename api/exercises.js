// api/courses.js
// Defines a REST api for the courses database
// API Functions
// get retrieves runs from database
// post stores runs in database

var Exercise = require("../models/exercise");
var router = require("express").Router();

router.get("/", function(req, res) { 
    Exercise.find(function(err, exercises) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(exercises);
        }
    });
});

router.post("/", function(req, res) {
    var exercise = new Exercise(req.body);
    exercise.save(function(err, exercise) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(exercise);
        }
    });
});


module.exports = router;