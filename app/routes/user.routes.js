module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.post("/register", user.register);
    router.post("/login", user.login);
    router.delete("/:id", user.delete);
    router.get("/email", user.findByEmail);

    app.use('/api/users', router);
};
