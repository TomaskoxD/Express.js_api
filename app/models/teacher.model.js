const sql = require("./db.js");

// constructor

const Teacher = function (teacher) {
    this.name = teacher.name;
    this.email = teacher.email;
    this.office = teacher.office;
    this.type_of_employment = teacher.type_of_employment;
};

Teacher.create = (newTeacher, result) => {
    office = newTeacher.office;
    type_of_employment = newTeacher.type_of_employment;
    delete newTeacher.office;
    delete newTeacher.type_of_employment;
    sql.query("INSERT INTO person SET ?", newTeacher, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        
        sql.query("INSERT INTO teacher SET ?", { id: res.insertId, office: office, type_of_employment: type_of_employment }, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("created teacher: ", { id: res.insertId, ...newTeacher });
            result(null, { id: res.insertId, ...newTeacher });
        });
    });
};

Teacher.findById = (id, result) => {
    sql.query(`SELECT * FROM person JOIN teacher ON person.id = teacher.id WHERE person.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found teacher: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Teacher.getAll = (name, result) => {
    let query = "SELECT * FROM person JOIN teacher ON person.id = teacher.id";

    if (name) {
        query += ` WHERE person.name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("teachers: ", res);
        result(null, res);
    });
};

Teacher.updateById = (id, newTeacher, result) => {
    office = newTeacher.office;
    type_of_employment = newTeacher.type_of_employment;
    delete newTeacher.office;
    delete newTeacher.type_of_employment;
    sql.query(
        "UPDATE person SET name = ?, email = ? WHERE id = ?",
        [newTeacher.name, newTeacher.email, id],
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
                "UPDATE teacher SET office = ?, type_of_employment = ? WHERE id = ?",
                [office, type_of_employment, id],
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    console.log("updated teacher: ", { id: id, ...newTeacher });
                    result(null, { id: id, ...newTeacher });
                }
            );
        }
    );
};

Teacher.remove = (id, result) => {


    sql.query("DELETE FROM teacher WHERE id = ?", id, (err, res) => {
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

            console.log("deleted teacher with id: ", id);
            result(null, res);
        });
    });

};

Teacher.removeAll = result => {
    sql.query("SELECT id FROM teacher", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        let ids = [];
        res.forEach(author => {
            ids.push(author.id);
        });


        sql.query("DELETE FROM teacher", (err, res) => {
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


module.exports = Teacher;
