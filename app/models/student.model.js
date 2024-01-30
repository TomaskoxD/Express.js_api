const sql = require("./db.js");

// constructor

const Student = function (student) {
    this.name = student.name;
    this.email = student.email;
    this.grade = student.grade;
    this.locker = student.locker;
};

Student.create = (newStudent, result) => {
    grade = newStudent.grade;
    locker = newStudent.locker;
    delete newStudent.grade;
    delete newStudent.locker;
    sql.query("INSERT INTO person SET ?", newStudent, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        sql.query("INSERT INTO student SET ?", { id: res.insertId, grade: grade, locker: locker }, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("created student: ", { id: res.insertId, ...newStudent });
            result(null, { id: res.insertId, ...newStudent });
        });
    });
};

Student.findById = (id, result) => {
    sql.query(`SELECT * FROM person JOIN student ON person.id = student.id WHERE person.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found student: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Student.getAll = (name, result) => {
    let query = "SELECT * FROM person JOIN student ON person.id = student.id";

    if (name) {
        query += ` WHERE person.name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("students: ", res);
        result(null, res);
    });
};

Student.updateById = (id, newStudent, result) => {
    grade = newStudent.grade;
    locker = newStudent.locker;
    delete newStudent.grade;
    delete newStudent.locker;
    sql.query(
        "UPDATE person SET name = ?, email = ? WHERE id = ?",
        [newStudent.name, newStudent.email, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }

            sql.query(
                "UPDATE student SET grade = ?, locker = ? WHERE id = ?",
                [grade, locker, id],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    console.log("updated student: ", { id: id, ...newStudent });
                    result(null, { id: id, ...newStudent });
                }
            );
        }
    );
};

Student.remove = (id, result) => {


    sql.query("DELETE FROM student WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        sql.query("DELETE FROM person WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("deleted student with id: ", id);
            result(null, res);
        });
    });

};

Student.removeAll = result => {
    sql.query("SELECT id FROM student", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        let ids = [];
        res.forEach(author => {
            ids.push(author.id);
        });


        sql.query("DELETE FROM student", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            sql.query("DELETE FROM person WHERE id IN (?)", [ids], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;

                }
            });
        });
    });
};


module.exports = Student;
