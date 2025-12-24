const express = require("express");
const router = express.Router();
const listingController = require("../controllers/listingController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/", authMiddleware, listingController.addListing);
router.post( "/", authMiddleware, upload.array("images", 3), listingController.addListing);
router.get("/", listingController.getAllListings);
router.get("/my", authMiddleware, listingController.getUserListings);
router.delete("/:id", authMiddleware, listingController.deleteListing);


module.exports = router;
