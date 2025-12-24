const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", listingController.getAllListings);

router.post(
  "/",
  authMiddleware,
  upload.array("images", 3),
  listingController.addListing
);

module.exports = router;
