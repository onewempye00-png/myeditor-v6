const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      referralCode TEXT,
      referredBy TEXT,
      clicks INTEGER DEFAULT 0
    )
  `);
});

module.exports = db;