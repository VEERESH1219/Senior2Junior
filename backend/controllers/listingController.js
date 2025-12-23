const Listing = require("../models/Listing");

// ADD LISTING
exports.addListing = (req, res) => {
  const { title, description, price, type } = req.body;

  if (!title || !price || !type) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  Listing.create(
    {
      user_id: req.user.id,
      title,
      description,
      price,
      type
    },
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to add listing" });
      }
      res.status(201).json({ message: "Listing added successfully" });
    }
  );
};

// GET ALL LISTINGS
exports.getAllListings = (req, res) => {
  Listing.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch listings" });
    }
    res.json(rows);
  });
};

// GET USER LISTINGS
exports.getUserListings = (req, res) => {
  Listing.getByUser(req.user.id, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch user listings" });
    }
    res.json(rows);
  });
};
