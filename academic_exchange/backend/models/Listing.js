const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    subject: { type: String, required: true },
    condition: { type: String, required: true },
    price: { type: Number, required: true },
    mode: { type: String, required: true },
    author: { type: String },

    // NEW: multiple images for swipe gallery
    images: [
      {
        url: { type: String, required: false },
        alt: { type: String, required: false }
      }
    ],

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    } // student who added the listing
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', listingSchema);
