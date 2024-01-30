const e = require("express");
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
  const teacher = new Teacher({
    name: req.body.name,
    email: req.body.email,
      office: req.body.office,
      type_of_employment: req.body.type_of_employment
  });

  // Save Author in the database
  Teacher.create(teacher, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Teacher."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  const name = req.query.name;

  Teacher.getAll(name, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teachers."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Teacher.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Teacher with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Teacher with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Teacher.updateById(
    req.params.id,
    new Author(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Teacher with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Teacher with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Teacher.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Teacher not found with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Teacher with id " + req.params.id
        });
      }
    } else res.send({ message: `Teacher was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
    Teacher.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred."
            });
        else res.send({ message: `All Teachers were deleted successfully!` });
    });
};



