const express = require("express");
const cors = require("cors");

// import routes
const authRoutes = require("./routes/authRoutes");
const listingRoutes = require("./routes/listingRoutes");

// create app FIRST
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes (AFTER app is created)
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "Academic Exchange Backend Running" });
});

module.exports = app;
