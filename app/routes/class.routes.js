module.exports = app => {
  const classes = require("../controllers/class.controller.js");
  const verifyToken = require('../middleware/auth.middleware.js');

  var router = require("express").Router();

  router.post("/", verifyToken, classes.create);
  router.post("/student", verifyToken, classes.addStudent);
  router.post("/tutorial", verifyToken, classes.addTutorial);
  router.get("/count/:id", verifyToken, classes.getCount);
  router.get("/", verifyToken, classes.findAll);

  router.put("/teacher", verifyToken, classes.changeTeacher);
  router.put("/:id", verifyToken, classes.update);
  // router.delete("/", verifyToken, classes.deleteAll);
  router.delete("/:id", verifyToken, classes.delete);
  router.delete("/student", verifyToken, classes.removeStudent);
  router.delete("/tutorial", verifyToken, classes.removeTutorial);

  app.use('/api/classes', router);
};
