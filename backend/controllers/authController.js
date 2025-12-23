const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// =======================
// REGISTER USER
// =======================
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      User.create(
        { name, email, password: hashedPassword },
        (err) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Registration failed" });
          }

          res
            .status(201)
            .json({ message: "User registered successfully" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Password hashing failed" });
    }
  });
};

// =======================
// LOGIN USER
// =======================
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  User.findByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token
      });
    } catch (error) {
      res.status(500).json({ message: "Login failed" });
    }
  });
};
