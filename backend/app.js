const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

const app = express(); // ✅ app is created FIRST

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ message: "Academic Exchange Backend Running" });
});

module.exports = app;
