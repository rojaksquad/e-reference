const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_reference",
});

router.get("/", (req, res, next) => {
  res.render("register");
});

router.post("/", (req, res, next) => {
  const { fullname, email, password } = req.body;

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          message: "There was an error",
        });
      }

      if (results.length > 0) {
        res.redirect("/register");
        return
      }

      let hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users SET ?",
        { fullname: fullname, email: email, password: hashedPassword },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/login");
          }
        }
      );
    }
  );
});

module.exports = router;
