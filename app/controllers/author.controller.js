const e = require("express");
const Author = require("../models/author.model.js");


// Create and Save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Author
    const author = new Author({
        name: req.body.name,
        email: req.body.email,
        active: req.body.active || false
    });


    // Save Author in the database
    Author.create(author, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Author."
            });
        else res.send(data);
    });
};


exports.findAll = (req, res) => {
    const name = req.query.name;

    Author.getAll(name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving authors."
            });
        else res.send(data);
    });
};


exports.findById = (req, res) => {
    Author.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Author with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Author with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findByEmail = (req, res) => {
    Author.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Author with email ${req.body.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Author with email " + req.body.email
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

    console.log(req.body);

    Author.updateById(
        req.params.id,
        new Author(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Author with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Author with id " + req.params.id
                    });
                }
            } else res.send({ message: `Author was updated successfully!` });
        }
    );
};


exports.delete = (req, res) => {
    Author.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Author not found with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Author with id " + req.params.id
                });
            }
        } else res.send({ message: `Author was deleted successfully!` });
    });
};


exports.deleteAll = (req, res) => {
    Author.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send({ message: `All Authors were deleted successfully!` });
    });
};



