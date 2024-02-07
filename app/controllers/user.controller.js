const User = require("../models/user.model.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Register a new user
exports.register = (req, res) => {
    console.log(req.body);
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    // Create a User
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    // Save User in the database
    User.create(user, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while registering the User."
            });
        else res.send(data);
    });
}

// Login a registered user
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty!"
        });
    }
    User.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(401).send({
                    message: "Invalid email or password!"
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with email " + req.body.email
                });
            }
        } else {
            if (!bcrypt.compareSync(req.body.password, data.password)) {
                return res.status(401).send({
                    message: "Invalid email or password!"
                });
            }
            const token = jwt.sign({ id: data.id }, 'secret', {
                expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({
                auth: true,
                token: token,
                user: data
            });
        }
    }
    );
}

exports.delete = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete User with id " + req.params.id
                });
            }
        } else res.send({ message: `User was deleted successfully!` });
    });
}

exports.findByEmail = (req, res) => {
    User.findByEmail(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with email ${req.body.email}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving User with email " + req.body.email
                });
            }
        } else res.send(data);
    });

};