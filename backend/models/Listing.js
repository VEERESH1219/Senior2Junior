const db = require("../config/db");

const Listing = {
  // =======================
  // CREATE LISTING (SELL / RENT)
  // =======================
  create: (data, callback) => {
    const sql = `
      INSERT INTO listings 
      (user_id, title, description, price, type, images)
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
        data.image,
        data.rent_days || null,
        0 // returned = false by default
      ],
      function (err) {
        callback(err, this?.lastID);
      }
    );
  },

  // =======================
  // GET ALL LISTINGS
  // =======================
  getAll: (callback) => {
    const sql = `
      SELECT listings.*, users.name AS seller
      FROM listings
      JOIN users ON listings.user_id = users.id
      ORDER BY listings.created_at DESC
    `;

    db.all(sql, [], callback);
  },

  // =======================
  // GET LISTINGS BY USER
  // =======================
  getByUser: (userId, callback) => {
    const sql = `
      SELECT * 
      FROM listings 
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;

    db.all(sql, [userId], callback);
  },

  // =======================
  // MARK RENTED BOOK AS RETURNED
  // =======================
  markReturned: (listingId, userId, callback) => {
    const sql = `
      UPDATE listings
      SET returned = 1
      WHERE id = ? AND user_id = ?
    `;

    db.run(sql, [listingId, userId], function (err) {
      callback(err, this?.changes);
    });
  }
};

module.exports = Listing;
