const Listing = require("../models/Listing");

exports.addListing = (req, res) => {
  const { title, description, price, type } = req.body;

  if (!title || !price || !type) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!req.files || req.files.length !== 3) {
    return res.status(400).json({
      message: "Exactly 3 images are required"
    });
  }

  const images = req.files.map(f => `/uploads/${f.filename}`);

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
          message: "Failed to add product"
        });
      }

      res.json({ message: "Product added successfully" });
    }
  );
};

exports.getAllListings = (req, res) => {
  Listing.getAll((err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Failed to fetch listings" });
    }
    res.json(rows);
  });
};
