module.exports = app => {
    const teachers = require("../controllers/teacher.controller.js");
    const verifyToken = require('../middleware/auth.middleware.js');

    var router = require("express").Router();
  
    // Create a new Tutorial, but first verify the token
    router.post("/", verifyToken,  teachers.create);
  
    // Retrieve all teachers
    router.get("/", verifyToken, teachers.findAll);

  
    // Retrieve a single Tutorial with id
    router.get("/:id", verifyToken, teachers.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", verifyToken, teachers.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", verifyToken, teachers.delete);
  
    // Delete all teachers
    router.delete("/", verifyToken, teachers.deleteAll);
  

    
  
    app.use('/api/teachers', router);
  };
  