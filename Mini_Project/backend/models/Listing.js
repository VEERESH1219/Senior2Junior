const db = require("../config/db");

const Listing = {
  /* =========================================
     CREATE LISTING (WITH LOCATION)
  ========================================= */
  create: (data, callback) => {
    const sql = `
      INSERT INTO listings 
      (user_id, title, description, price, type, images, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.run(
      sql,
      [
        data.user_id,
        data.title,
        data.description,
        data.price,
        data.type,
        data.images,
        data.latitude,
        data.longitude
      ],
      callback
    );
  },

  /* =========================================
     GET ALL LISTINGS (NO LOCATION)
  ========================================= */
  getAll: callback => {
    const sql = `
      SELECT listings.*, users.name AS seller
      FROM listings
      JOIN users ON listings.user_id = users.id
      ORDER BY listings.created_at DESC
    `;
    db.all(sql, [], callback);
  },

  /* =========================================
     GET NEARBY LISTINGS (5 KM RADIUS)
     Haversine Formula (SQLite-safe)
  ========================================= */
  getNearBy: (lat, lng, radiusKm, callback) => {
    const sql = `
      SELECT listings.*, users.name AS seller,
      (
        6371 * acos(
          cos(radians(?)) *
          cos(radians(latitude)) *
          cos(radians(longitude) - radians(?)) +
          sin(radians(?)) *
          sin(radians(latitude))
        )
      ) AS distance
      FROM listings
      JOIN users ON listings.user_id = users.id
      WHERE latitude IS NOT NULL
        AND longitude IS NOT NULL
      HAVING distance <= ?
      ORDER BY distance ASC
    `;

    db.all(
      sql,
      [lat, lng, lat, radiusKm],
      callback
    );
  }
};

module.exports = Listing;
