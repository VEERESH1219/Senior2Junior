const db = require("../config/db");

const Listing = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO listings (user_id, title, description, price, type, images)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [
        data.user_id,
        data.title,
        data.description,
        data.price,
        data.type,
        data.images
      ],
      callback
    );
  },

  getAll: callback => {
    const sql = `
      SELECT listings.*, users.name AS seller
      FROM listings
      JOIN users ON listings.user_id = users.id
      ORDER BY listings.created_at DESC
    `;
    db.all(sql, [], callback);
  }
};

module.exports = Listing;
