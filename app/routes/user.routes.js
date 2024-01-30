module.exports = app => {
    const user = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // register a new user
    router.post("/register", user.register);

    // login a user
    router.post("/login", user.login);

  
    app.use('/api/users', router);
  };
  