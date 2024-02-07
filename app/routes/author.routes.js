module.exports = app => {
    const authors = require("../controllers/author.controller.js");
    const verifyToken = require('../middleware/auth.middleware.js');

    var router = require("express").Router();
  
    router.post("/", verifyToken,  authors.create);  
  router.get("/", verifyToken, authors.findAll);
  router.get("/email", verifyToken, authors.findByEmail);
    router.get("/:id", verifyToken, authors.findById);
    router.put("/:id", verifyToken, authors.update);
    router.delete("/", verifyToken, authors.deleteAll);
    router.delete("/:id", verifyToken, authors.delete);

    app.use('/api/authors', router);
  };
  