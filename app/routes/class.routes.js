module.exports = app => {
    const classes = require("../controllers/class.controller.js");
    const verifyToken = require('../middleware/auth.middleware.js');

    var router = require("express").Router();
  
    router.post("/", verifyToken,  classes.create);  
    router.post("/student", verifyToken, classes.addStudent);
    router.post("/tutorial", verifyToken, classes.addTutorial);
    router.get("/:id", verifyToken, classes.findById);
    router.delete("/student", verifyToken, classes.removeStudent);
    router.delete("/tutorial", verifyToken, classes.removeTutorial);

    app.use('/api/classes', router);
  };
  