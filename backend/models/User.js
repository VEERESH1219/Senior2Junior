const db = require("../config/db");

const User = {
  create: (user, callback) => {
    const sql =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.run(sql, [user.name, user.email, user.password], function (err) {
      callback(err, this?.lastID);
    });
  },

  findByEmail: (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.get(sql, [email], (err, row) => {
      callback(err, row);
    });
  }
};

module.exports = User;
