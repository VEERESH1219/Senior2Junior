const Listing = require("../models/Listing");

// =======================
// ADD LISTING (SELL / RENT)
// =======================
exports.addListing = (req, res) => {
  const { title, description, price, type } = req.body;

  // 🔐 basic validation
  if (!title || !price || !type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // 🖼️ IMAGE VALIDATION (PUT THIS HERE)
  if (!req.files || req.files.length !== 3) {
    return res.status(400).json({
      message: "Exactly 3 images are required"
    });
  }

  // collect image paths
  const images = req.files.map(file => `/uploads/${file.filename}`);

  // save listing
  Listing.create(
    {
      user_id: req.user.id,
      title,
      description,
      price,
      type,
      images: JSON.stringify(images)
    },
    err => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Failed to add listing"
        });
      }

      res.status(201).json({
        message: "Listing added successfully"
      });
    }
  );
};


// =======================
// GET ALL LISTINGS
// =======================
exports.getAllListings = (req, res) => {
  Listing.getAll((err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch listings" });
    }
    res.json(rows);
  });
};

// =======================
// GET LOGGED-IN USER LISTINGS
// =======================
exports.getUserListings = (req, res) => {
  Listing.getByUser(req.user.id, (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch user listings" });
    }
    res.json(rows);
  });
};

exports.deleteListing = (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Admin access only" });
  }

  const sql = "DELETE FROM listings WHERE id = ?";
  const db = require("../config/db");

  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ message: "Delete failed" });
    }
    res.json({ message: "Listing deleted by admin" });
  });
};
