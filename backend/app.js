const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const express = require("express");
const cors = require("cors");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.json({ message: "Academic Exchange Backend Running" });
});

module.exports = app;
