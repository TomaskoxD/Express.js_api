module.exports = app => {
    const teachers = require("../controllers/teacher.controller.js");
    const verifyToken = require('../middleware/auth.middleware.js');

    var router = require("express").Router();

    router.post("/", verifyToken, teachers.create);
    router.get("/", verifyToken, teachers.findAll);
    router.get("/:id", verifyToken, teachers.findOne);
    router.put("/:id", verifyToken, teachers.update);
    router.delete("/", verifyToken, teachers.deleteAll);
    router.delete("/:id", verifyToken, teachers.delete);

    app.use('/api/teachers', router);
};
