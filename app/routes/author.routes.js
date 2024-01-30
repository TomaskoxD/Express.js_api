module.exports = app => {
    const authors = require("../controllers/author.controller.js");
    const verifyToken = require('../middleware/auth.middleware.js');

    var router = require("express").Router();
  
    // Create a new Tutorial, but first verify the token
    router.post("/", verifyToken,  authors.create);
  
    // Retrieve all authors
    router.get("/", verifyToken, authors.findAll);

  
    // Retrieve a single Tutorial with id
    router.get("/:id", verifyToken, authors.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", verifyToken, authors.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", verifyToken, authors.delete);
  
    // Delete all authors
    router.delete("/", verifyToken, authors.deleteAll);
  

    
  
    app.use('/api/authors', router);
  };
  