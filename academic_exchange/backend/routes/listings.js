const express = require('express');
const Listing = require('../models/Listing');
const protect = require('../middleware/auth');

const router = express.Router();

// GET all listings (public)
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// NEW: GET single listing by id (public)
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(listing);
  } catch {
    res.status(400).json({ message: 'Invalid id' });
  }
});

// CREATE listing (only logged-in users)
router.post('/', protect, async (req, res) => {
  try {
    const listing = new Listing({
      ...req.body,          // includes images array if sent
      owner: req.user.id
    });
    const saved = await listing.save();
    res.status(201).json(saved);
  } catch {
    res.status(400).json({ message: 'Invalid data' });
  }
});

// UPDATE listing (only owner can edit)
router.put('/:id', protect, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (listing.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'You can edit only your own listing' });
    }

    Object.assign(listing, req.body); // can update images too
    const updated = await listing.save();
    res.json(updated);
  } catch {
    res.status(400).json({ message: 'Update failed' });
  }
});

module.exports = router;
