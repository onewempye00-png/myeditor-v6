const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// SIGNUP
app.post("/api/signup", (req, res) => {
  const { email, ref } = req.body;

  const code = Math.random().toString(36).substring(2, 8).toUpperCase();

  db.run(
    "INSERT INTO users (email, referralCode, referredBy) VALUES (?, ?, ?)",
    [email, code, ref || null],
    function (err) {
      if (err) return res.json({ error: "exists" });

      res.json({ referralCode: code });
    }
  );
});

app.listen(PORT, () => {
  console.log("Backend running on", PORT);
});