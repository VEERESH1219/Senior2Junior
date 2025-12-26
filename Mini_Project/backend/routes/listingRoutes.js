const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

/*
  GET
  /api/listings
  Supports:
  ?lat=xx&lng=yy&radius=5
*/
router.get("/", listingController.getAllListings);

/*
  POST
  /api/listings
  Requires auth + 3 images + location
*/
router.post(
  "/",
  authMiddleware,
  upload.array("images", 3),
  listingController.addListing
);

module.exports = router;
