const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, listingController.addListing);
router.get("/", listingController.getAllListings);
router.get("/my", authMiddleware, listingController.getUserListings);

module.exports = router;
