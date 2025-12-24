const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const db = new sqlite3.Database(
  path.join(__dirname, "../academic_exchange.db"),
  err => {
    if (err) {
      console.error("DB connection failed", err);
    } else {
      console.log("SQLite database connected");
    }
  }
);

module.exports = db;
