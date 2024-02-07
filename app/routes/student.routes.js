module.exports = app => {
  const students = require("../controllers/student.controller.js");
  const verifyToken = require('../middleware/auth.middleware.js');

  var router = require("express").Router();

  router.post("/", verifyToken, students.create);
  router.get("/", verifyToken, students.findAll);
  router.get("/email", verifyToken, students.findByEmail);
  router.get("/:id", verifyToken, students.findById);
  router.put("/:id", verifyToken, students.update);
  router.delete("/", verifyToken, students.deleteAll);
  router.delete("/:id", verifyToken, students.delete);

  app.use('/api/students', router);
};
