const db = require("../config/db");

const Listing = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO listings (user_id, title, description, price, type)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [data.user_id, data.title, data.description, data.price, data.type],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  getAll: (callback) => {
    const sql = `
      SELECT listings.*, users.name AS seller
      FROM listings
      JOIN users ON listings.user_id = users.id
      ORDER BY listings.created_at DESC
    `;
    db.all(sql, [], callback);
  },

  getByUser: (userId, callback) => {
    const sql = "SELECT * FROM listings WHERE user_id = ?";
    db.all(sql, [userId], callback);
  }
};

module.exports = Listing;
