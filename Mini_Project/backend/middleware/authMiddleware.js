const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.user.isAdmin = decoded.email === "admin@admin.com";
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
