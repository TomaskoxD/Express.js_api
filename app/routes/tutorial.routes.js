module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");
  const verifyToken = require('../middleware/auth.middleware.js');

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", verifyToken, tutorials.create);

  // Retrieve all Tutorials
  router.get("/", verifyToken, tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", verifyToken, tutorials.findAllPublished);

  // Retrieve all Tutorials from the database (with condition).
  router.get("/filter", verifyToken, tutorials.findAllFilter);

  // Retrieve a single Tutorial with id
  router.get("/:id", verifyToken, tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", verifyToken, tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", verifyToken, tutorials.delete);

  // Delete all Tutorials
  router.delete("/", verifyToken, tutorials.deleteAll);

  app.use('/api/tutorials', router);
};
