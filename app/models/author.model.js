const sql = require("./db.js");

// constructor

const Author = function (author) {
    this.name = author.name;
    this.email = author.email;
    this.active = author.active;
};

Author.create = (newAuthor, result) => {
    //remove active from newAuthor
    active = newAuthor.active;
    delete newAuthor.active;
    sql.query("INSERT INTO person SET ?", newAuthor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        sql.query("INSERT INTO author SET ?", { id: res.insertId, active: active }, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("created author: ", { id: res.insertId, ...newAuthor });
            result(null, { id: res.insertId, ...newAuthor });
        });
    });
};

Author.findById = (id, result) => {
    sql.query(`SELECT * FROM person JOIN author ON person.id = author.id WHERE person.id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.length) {
            console.log("found author: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Author with the id
        result({ kind: "not_found" }, null);
    });
};

Author.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM person JOIN author ON person.id = author.id WHERE person.email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found author: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Student with the email
        result({ kind: "not_found" }, null);
    });
};

Author.getAll = (name, result) => {
    let query = "SELECT * FROM person JOIN author ON person.id = author.id";

    if (name) {
        query += ` WHERE person.name LIKE '%${name}%'`;
    }

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("authors: ", res);
        result(null, res);
    });
};

Author.updateById = (id, newAuthor, result) => {

    console.log(newAuthor, "newAuthor");
    console.log(id, "id");


    sql.query("SELECT * FROM author LEFT JOIN person ON author.id = person.id WHERE author.id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            if (!newAuthor.name && !newAuthor.email) {
                if (newAuthor.active === undefined) {
                    result(null, res[0]);
                    return;
                }
                else {
                    query = "UPDATE author SET ";
                    if (newAuthor.active !== undefined) {
                        query += `active = ${newAuthor.active}, `;
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
                if (newAuthor.name) {
                    query += `name = '${newAuthor.name}', `;
                }
                if (newAuthor.email) {
                    query += `email = '${newAuthor.email}', `;
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


                    if (newAuthor.active === undefined) {
                        result(null, res[0]);
                        return;
                    }
                    else {
                        query = "UPDATE author SET ";
                        if (newAuthor.active !== undefined) {
                            query += `active = ${newAuthor.active}, `;
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




Author.remove = (id, result) => {
    // remove all tutorials by the author
    sql.query("DELETE FROM tutorials WHERE authorId = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows > 0) {
            console.log(`deleted ${res.affectedRows} tutorials`);

        }

        sql.query("DELETE FROM author WHERE id = ?", id, (err, res) => {
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

                console.log("deleted author with id: ", id);
                result(null, res);
            });
        });
    });
};

Author.removeAll = result => {
    // get all ids of authors to delete tutorials and authors
    sql.query("SELECT id FROM author", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        let ids = [];
        res.forEach(author => {
            ids.push(author.id);
        });


        sql.query("DELETE FROM author", (err, res) => {
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

                sql.query("DELETE FROM tutorials WHERE authorId IN (?)", [ids], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    console.log(`deleted ${res.affectedRows} tutorials`);
                    console.log(`deleted ${res.affectedRows} authors`);

                    result(null, res);
                });
            });
        });
    });
};


module.exports = Author;
