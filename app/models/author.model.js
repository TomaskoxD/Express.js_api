const sql = require("./db.js");

// constructor

const Author = function (author) {
  this.name = author.name;
  this.email = author.email;
  this.active = author.active;
};

Author.create = (newAuthor, result) => {
  sql.query("INSERT INTO author SET ?", newAuthor, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("created author: ", { id: res.insertId, ...newAuthor });
    result(null, { id: res.insertId, ...newAuthor });
  });
};

Author.findById = (id, result) => {
  sql.query(`SELECT * FROM author WHERE id = ${id}`, (err, res) => {
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

Author.getAll = (name, result) => {
  let query = "SELECT * FROM author";

  if (name) {
    query += ` WHERE name LIKE '%${name}%'`;
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

Author.updateById = (id, author, result) => {
  sql.query(
    "UPDATE author SET name = ?, email = ?, active = ? WHERE id = ?",
    [author.name, author.email, author.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      if (res.affectedRows == 0) {
        // not found Author with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated author: ", { id: id, ...author });
      result(null, { id: id, ...author });
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

      console.log("deleted author with id: ", id);
      result(null, res);
    });
  });
};

Author.removeAll = result => {
    sql.query("DELETE FROM author", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
        }

        console.log(`deleted ${res.affectedRows} authors`);

        sql.query("DELETE FROM tutorials", (err, res) => {

            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} tutorials`);

            result(null, res);
        }
        );
    }
    );
}
module.exports = Author;
