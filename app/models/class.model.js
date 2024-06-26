const { query } = require("express");
const sql = require("./db.js");

// constructor

const Class = function (classes) {
    this.name = classes.name;
    this.teacher_id = classes.teacher_id;
};

Class.create = (newClass, result) => {
    sql.query("INSERT INTO class SET ?", newClass, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("created class: ", { id: res.insertId, ...newClass });
        result(null, { id: res.insertId, ...newClass });
    });
}

Class.addStudent = (class_id, student_id, result) => {

    // Create a promise for checking if the student exists
    const checkStudentPromise = new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM student WHERE id = ${student_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } else if (!res.length) {
                console.log("student not found");
                reject({ kind: "not_found" });
            } else {
                console.log("found student");
                resolve();
            }
        });
    });

    // Create a promise for checking if the class exists
    const checkClassPromise = new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM class WHERE id = ${class_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } else if (!res.length) {
                console.log("class not found");
                reject({ kind: "not_found" });
            } else {
                console.log("found class");
                resolve();
            }
        });
    });

    // Create a promise for checking if the student is already in the class
    const checkStudentClassPromise = new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM student_class WHERE student_id = ${student_id} AND class_id = ${class_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            else if (res.length) {
                console.log("student already in class");
                reject({ kind: "already_in_class" });
            }
            else {
                console.log("student not in class");
                resolve();
            }
        });
    });



    // Use Promise.all to wait for both promises to resolve or reject
    Promise.all([checkStudentPromise, checkClassPromise, checkStudentClassPromise])
        .then(() => {
            sql.query(
                `INSERT INTO student_class (student_id, class_id) VALUES (${student_id}, ${class_id})`,
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        console.log("created student_class: ", {
                            id: res.insertId,
                            student_id: student_id,
                            class_id: class_id,
                        });
                        result(null, {
                            id: res.insertId,
                            student_id: student_id,
                            class_id: class_id,
                        });
                    }
                }
            );
        })
        .catch((err) => {
            // If any promise rejected, send an error response
            console.log("Promise rejected: ", err);
            result(err, null);
        });
};

Class.addTutorial = (class_id, tutorial_id, result) => {
    const checkTutorialPromise = new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM tutorials WHERE id = ${tutorial_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } else if (!res.length) {
                console.log("tutorial not found");
                reject({ kind: "not_found" });
            } else {
                console.log("found tutorial");
                resolve();
            }
        });
    });

    const checkClassPromise = new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM class WHERE id = ${class_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            } else if (!res.length) {
                console.log("class not found");
                reject({ kind: "not_found" });
            } else {
                console.log("found class");
                resolve();
            }
        });
    });

    const checkClassTutorialPromise = new Promise((resolve, reject) => {
        sql.query(`SELECT * FROM class_tutorial WHERE class_id = ${class_id} AND tutorial_id = ${tutorial_id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }
            else if (res.length) {
                console.log("tutorial already in class");
                reject({ kind: "already_in_class" });
            }
            else {
                console.log("tutorial not in class");
                resolve();
            }
        });
    });

    Promise.all([checkTutorialPromise, checkClassPromise, checkClassTutorialPromise])
        .then(() => {
            sql.query(
                `INSERT INTO class_tutorial (class_id, tutorial_id) VALUES (${class_id}, ${tutorial_id})`,
                (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    } else {
                        console.log("created class_tutorial: ", {
                            id: res.insertId,
                            class_id: class_id,
                            tutorial_id: tutorial_id,
                        });
                        result(null, {
                            id: res.insertId,
                            class_id: class_id,
                            tutorial_id: tutorial_id,
                        });
                    }
                }
            );
        })
        .catch((err) => {
            console.log("Promise rejected: ", err);
            result(err, null);
        });
};

Class.removeStudent = (class_id, student_id, result) => {
    sql.query(`DELETE FROM student_class WHERE student_id = ${student_id} AND class_id = ${class_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    }
    );

};

Class.removeTutorial = (class_id, tutorial_id, result) => {
    sql.query(`DELETE FROM class_tutorial WHERE class_id = ${class_id} AND tutorial_id = ${tutorial_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    }
    );

};

function findByCondition(condition, result) {
    classId = condition.split("=")[1].trim();
    console.log(classId, "SELECT * FROM class WHERE id = ${classId}");
    sql.query(`SELECT * FROM class WHERE id = ${classId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            let classObj = res[0];
            console.log(classObj);
            sql.query(`SELECT student_id FROM student_class WHERE class_id = ${classId}`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else if (!res.length) {
                    console.log("no students in class", classObj);
                    classObj.students = [];
                    sql.query(`SELECT tutorial_id FROM class_tutorial WHERE class_id = ${classId}`, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                        }
                        else if (!res.length) {
                            console.log("no tutorials in class", classObj);
                            classObj.tutorials = [];
                            result(null, classObj);
                        }
                        else {
                            // get tutorial info from tutorial table
                            classObj.tutorials = [];
                            let tutorialIds = res.map(tutorial => tutorial.tutorial_id);
                            if (tutorialIds.length) {
                                sql.query(`SELECT * FROM tutorials LEFT JOIN author ON tutorials.author_id = author.id WHERE tutorials.id IN (${tutorialIds.join(",")})`, (err, res) => {
                                    if (err) {
                                        console.log("error: ", err);
                                        result(null, err);
                                    }
                                    else {
                                        classObj.tutorials = res;
                                        result(null, classObj);
                                    }
                                });
                            }
                            else {
                                result(null, classObj);
                            }
                        }

                    });
                }
                else {
                    classObj.students = [];
                    let studentIds = res.map(student => student.student_id);
                    console.log(studentIds);

                    if (studentIds.length) {
                        sql.query(`SELECT * FROM student
                                 INNER JOIN person ON student.id = person.id
                                 WHERE student.id IN (${studentIds.join(",")})`, (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                            }
                            else {
                                classObj.students = res;
                                sql.query(`SELECT tutorial_id FROM class_tutorial WHERE class_id = ${classId}`, (err, res) => {
                                    if (err) {
                                        console.log("error: ", err);
                                        result(null, err);
                                    }
                                    else if (!res.length) {
                                        console.log("no tutorials in class", classObj);
                                        classObj.tutorials = [];
                                    }
                                    else {
                                        // get tutorial info from tutorial table
                                        classObj.tutorials = [];
                                        let tutorialIds = res.map(tutorial => tutorial.tutorial_id);
                                        if (tutorialIds.length) {
                                            sql.query(`SELECT * FROM tutorials LEFT JOIN author ON tutorials.author_id = author.id WHERE tutorials.id IN (${tutorialIds.join(",")})`, (err, res) => {
                                                if (err) {
                                                    console.log("error: ", err);
                                                    result(null, err);
                                                }
                                                else {
                                                    classObj.tutorials = res;
                                                    result(null, classObj);
                                                }
                                            });
                                        }
                                        else {
                                            result(null, classObj);
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else {
                        result(null, classObj);
                    }
                    // result(null, classObj);
                }
            }
            );
        }
    }
    );
    // // get class by id with students and tutorials included from the database tables


}
Class.findById = (classId, result) => {
    findByCondition(`id = ${classId}`, result);
}

Class.getAll = (conditions, result) => {
    // ?????????????????????? toto hadze objekt a nie string
    console.log("condition", conditions);
    let query = "SELECT * FROM class WHERE";
    for (let key in conditions) {
        if (conditions[key] !== "") {
            query += ` ${key} = '${conditions[key]}' AND`;
        }
    }
    query = query.slice(0, -3);


    console.log(query);
    // ///////////////////////////
    sql.query(query, (err, res
    ) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            let classes = res;
            let classIds = res.map(classObj => classObj.id);
            if (classIds.length) {
                sql.query(`SELECT student_id, class_id FROM student_class WHERE class_id IN (${classIds.join(",")})`, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                    }
                    else if (!res.length) {
                        console.log("no students in class", classes);
                        classes.forEach(classObj => classObj.students = []);
                        sql.query(`SELECT tutorial_id, class_id FROM class_tutorial WHERE class_id IN (${classIds.join(",")})`, (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(null, err);
                            }
                            else if (!res.length) {
                                console.log("no tutorials in class", classes);
                                classes.forEach(classObj => classObj.tutorials = []);
                                result(null, classes);
                            }
                            else {
                                // get tutorial info from tutorial table
                                classes.forEach(classObj => classObj.tutorials = []);
                                let tutorialIds = res.map(tutorial => tutorial.tutorial_id);
                                if (tutorialIds.length) {
                                    sql.query(`SELECT * FROM tutorials LEFT JOIN author ON tutorials.author_id = author.id WHERE tutorials.id IN (${tutorialIds.join(",")})`, (err, res) => {
                                        if (err) {
                                            console.log("error: ", err);
                                            result(null, err);
                                        }
                                        else {
                                            classes.forEach(classObj => classObj.tutorials = res);
                                            result(null, classes);
                                        }
                                    });
                                }
                                else {
                                    result(null, classes);
                                }
                            }
                        });
                    }
                    else {
                        classes.forEach(classObj => classObj.students = []);
                        let studentIds = res.map(student => student.student_id);
                        console.log(studentIds);

                        if (studentIds.length) {
                            sql.query(`SELECT * FROM student
                                 INNER JOIN person ON student.id = person.id
                                 WHERE student.id IN (${studentIds.join(",")})`, (err, res) => {
                                if (err) {
                                    console.log("error: ", err);
                                    result(null, err);
                                }
                                else {
                                    classes
                                        .forEach(classObj => classObj.students = res);
                                    sql.query(`SELECT tutorial_id, class_id FROM class_tutorial WHERE class_id IN (${classIds.join(",")})`, (err, res) => {
                                        if (err) {
                                            console.log("error: ", err);
                                            result(null, err);
                                        }
                                        else if (!res.length) {
                                            console.log("no tutorials in class", classes);
                                            classes.forEach(classObj => classObj.tutorials = []);
                                        }
                                        else {
                                            // get tutorial info from tutorial table
                                            classes.forEach(classObj => classObj.tutorials = []);
                                            let tutorialIds = res.map(tutorial => tutorial.tutorial_id);
                                            if (tutorialIds.length) {
                                                sql.query(`SELECT * FROM tutorials LEFT JOIN author ON tutorials.author_id = author.id WHERE tutorials.id IN (${tutorialIds.join(",")})`, (err, res) => {
                                                    if (err) {
                                                        console.log("error: ", err);
                                                        result(null, err);
                                                    }
                                                    else {
                                                        classes.forEach(classObj => classObj.tutorials = res);
                                                        result(null, classes);
                                                    }
                                                });
                                            }
                                            else {
                                                result(null, classes);
                                            }
                                        }
                                    }
                                    );
                                }
                            }
                            );
                        }
                        else {
                            result(null, classes);
                        }
                        // result(null, classes);
                    }
                }
                );
            }
            else {
                result(null, classes);
            }
        }
    }
    );
}


Class.updateById = (id, classObj, result) => {
    sql.query(
        "UPDATE class SET name = ? WHERE id = ?",
        [classObj.name, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found class with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated class: ", { id: id, ...classObj });
            result(null, { id: id, ...classObj });
        }
    );
};



Class.remove = (id, result) => {
    sql.query("DELETE FROM student_class WHERE class_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }


        console.log("deleted class_student with id: ", id);

        sql.query("DELETE FROM class_tutorial WHERE class_id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log("deleted class_tutorial with id: ", id);

            sql.query("DELETE FROM class WHERE id = ?", id, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                if (res.affectedRows == 0) {
                    console.log("res.affectedRows == 0");
                    // not found class with the id
                    result({ kind: "not_found" }, null);
                    return;
                }
                console.log("deleted class with id: ", id);
                console.log("returned from class_tutorial");
                result(null, res);
            });
        }
        );
    });
};

Class.getCount = (id, result) => {
    console.log("id", id);

    // check if class exists
    sql.query("SELECT * FROM class WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (!res.length) {
            console.log("class not found");
            result({ kind: "not_found" });
            return;
        }
        // get count of students and tutorials in a class
        sql.query("SELECT COUNT(*) as student_count FROM student_class WHERE class_id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            let studentCount = res[0].student_count;
            sql.query("SELECT COUNT(*) as tutorial_count FROM class_tutorial WHERE class_id = ?", id, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
                let tutorialCount = res[0].tutorial_count;
                result(null, { student_count: studentCount, tutorial_count: tutorialCount });
            });
        }
        );
    });

}

Class.changeTeacher = (class_id, teacher_id, result) => {
    console.log("class_id", class_id);
    console.log("teacher_id", teacher_id);

    sql.query(`SELECT * FROM teacher WHERE id = ${teacher_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (!res.length) {
            console.log("teacher not found");
            result({ kind: "not_found_teacher" }, null);
            return;
        }
    
    sql.query(`UPDATE class SET teacher_id = ${teacher_id} WHERE id = ${class_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            console.log("res.affectedRows == 0");
            // not found class with the id
            result({ kind: "not_found_class" }, null);
            return;
        }
        console.log("updated class with id: ", class_id);
        result(null, res);
    }
        );
    }
    );
}

module.exports = Class;