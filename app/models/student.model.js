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

Student.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM person JOIN student ON person.id = student.id WHERE person.email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found student: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Student with the email
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

    console.log(newStudent, "newStudent");
    console.log(id, "id");


    sql.query("SELECT * FROM student LEFT JOIN person ON student.id = person.id WHERE student.id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            if (!newStudent.name && !newStudent.email) {
                if(!newStudent.grade && !newStudent.locker){
                    result(null, res[0]);
                    return;
                }
                else{
                    query = "UPDATE student SET ";
                    if (newStudent.grade) {
                        query += `grade = ${newStudent.grade}, `;
                    }
                    if (newStudent.locker) {
                        query += `locker = ${newStudent.locker}, `;
                    }
                    query = query.slice(0, -2);
                    query += ` WHERE id = ${id}`;
                    sql.query(query, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }
                        result(null, res);
                    }
                    );
                }

            } else {
                query = "UPDATE person SET ";
                if (newStudent.name) {
                    query += `name = '${newStudent.name}', `;
                }
                if (newStudent.email) {
                    query += `email = '${newStudent.email}', `;
                }
                query = query.slice(0, -2);
                query += ` WHERE id = ${id}`;
                sql.query(query, (err
                    , res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }
            

                    if (!newStudent.grade && !newStudent.locker) {
                        result(null, res[0]);
                        return;
                    }
                    else {
                        query = "UPDATE student SET ";
                        if (newStudent.grade) {
                            query += `grade = ${newStudent.grade}, `;
                        }
                        if (newStudent.locker) {
                            query += `locker = ${newStudent.locker}, `;
                        }
                        query = query.slice(0, -2);
                        query += ` WHERE id = ${id}`;
                        sql.query(query, (err
                            , res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                                return;
                            }
                            result(null, res);
                        }
                        );
                    }
                }
                );     
            }
            
        }
        else {
            result({ kind: "not_found" }, null);
        }
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
