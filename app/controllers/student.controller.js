const e = require("express");
const Student = require("../models/student.model.js");


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Student
    const student = new Student({
        name: req.body.name,
        email: req.body.email,
        grade: req.body.grade,
        locker: req.body.locker
    });


    // Save Student in the database
    Student.create(student, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Student."
            });
        else res.send(data);
    });
};


exports.findAll = (req, res) => {
    const name = req.query.name;

    Student.getAll(name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving students."
            });
        else res.send(data);
    });
};


exports.findById = (req, res) => {
    Student.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findByEmail = (req, res) => {
    Student.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Student with email ${req.body.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Student with email " + req.body.email
                });
            }
        } else res.send(data);
    });
}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Student.updateById(
        req.params.id,
        new Student(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Student with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Student with id " + req.params.id
                    });
                }
            } else res.send({ message: `Student was updated successfully!` });
        }
    );
};

exports.delete = (req, res) => {
    Student.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Student not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Student with id " + req.params.id
                });
            }
        } else res.send({ message: `Student was deleted successfully!` });
    });
};


exports.deleteAll = (req, res) => {
    Student.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send({ message: `All Students were deleted successfully!` });
    });
};



