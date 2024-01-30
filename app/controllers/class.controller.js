const e = require("express");
const Class = require("../models/class.model.js");
const Student = require("../models/student.model.js");
const Teacher = require("../models/teacher.model.js");


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Author
    const classes = new Class({
        name: req.body.name,
        teacher_id: req.body.teacher_id
    });
        


    // Save Author in the database
    Class.create(classes, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Author."
            });
        else res.send(data);
    });
};

exports.addStudent = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Student id can not be empty!"
        });
    }

    const promises = [];
    for (const key in req.body) {

        const student_id = req.body[key]["student_id"];
        const class_id = req.body[key]["class_id"];
        const addStudentPromise = new Promise((resolve, reject) => {

            Class.addStudent(class_id, student_id, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });

    // Add the promise to the promises array
    promises.push(addStudentPromise);
}
// Use Promise.all to wait for all promises to resolve or reject
Promise.all(promises)
    .then(() => {
        // If all promises resolved successfully, send success response
        res.send({ message: "Students added successfully." });
    })
    .catch((err) => {
        // If any promise rejected, send an error response
        res.status(500).send({
            message: err.message || "Some error occurred."
        });
    });
}


exports.removeStudent = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Student id can not be empty!"
        });
    }
    
    const promises = [];
    for (const key in req.body) {

        const student_id = req.body[key]["student_id"];
        const class_id = req.body[key]["class_id"];
        const removeStudentPromise = new Promise((resolve, reject) => {

            Class.removeStudent(class_id, student_id, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
        });
        
        // Add the promise to the promises array
        promises.push(removeStudentPromise);
    }
    // Use Promise.all to wait for all promises to resolve or reject
    Promise.all(promises)
        .then(() => {
            // If all promises resolved successfully, send success response
            res.send({ message: "Students removed successfully." });
        })
        .catch((err) => {
            // If any promise rejected, send an error response
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
    
}

exports.addTutorial = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Tutorial id can not be empty!"
        });
    }

    const promises = [];
    for (const key in req.body) {

        const tutorial_id = req.body[key]["tutorial_id"];
        const class_id = req.body[key]["class_id"];
        const addTutorialPromise = new Promise((resolve, reject) => {

            Class.addTutorial(class_id, tutorial_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {    
                    resolve(data);
                }
            }
            );
        });

        // Add the promise to the promises array
        promises.push(addTutorialPromise);
    }
    // Use Promise.all to wait for all promises to resolve or reject
    Promise.all(promises)
        .then(() => {
            // If all promises resolved successfully, send success response
            res.send({ message: "Tutorials added successfully." });
        })
        .catch((err) => {
            // If any promise rejected, send an error response
            res.status(500).send({
                message: err.message || "Some error occurred."
            }); 
        }); 
}


exports.removeTutorial = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Tutorial id can not be empty!"
        });
    }
  
    const promises = [];
    for (const key in req.body) {

        const tutorial_id = req.body[key]["tutorial_id"];
        const class_id = req.body[key]["class_id"];
        const removeTutorialPromise = new Promise((resolve, reject) => {

            Class.removeTutorial(class_id, tutorial_id, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        // Add the promise to the promises array
        promises.push(removeTutorialPromise);
    }
    // Use Promise.all to wait for all promises to resolve or reject
    Promise.all(promises)
        .then(() => {
            // If all promises resolved successfully, send success response
            res.send({ message: "Tutorials removed successfully." });
        })
        .catch((err) => {
            // If any promise rejected, send an error response
            res.status(500).send({
                message: err.message || "Some error occurred."
            });
        });
        
}

exports.findById = (req, res) => {
    Class.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Class not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Class with id " + req.params.id
                });
            }
        } else res.send(data);
    });
}
