const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "../../academic_exchange.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("SQLite connection error:", err.message);
  } else {
    console.log("SQLite database connected");
  }
});

module.exports = db;
