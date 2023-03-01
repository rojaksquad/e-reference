const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

const router = express.Router();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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
        // return res.render('register', {message:"There was an error"})
        res.json({
          message: "There was an error",
        });
      }

      if (results.length > 0) {
        // return res.render("register", { message: "Email has been taken" });
        res.json({
          message: "Email has been taken",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);

      db.query(
        "INSERT INTO users SET ?",
        { fullname: fullname, email: email, password: hashedPassword },
        (err, results) => {
          if (err) {
            console.log(err);
          } else {
            // return res.render("home", { api_key });
            res.json({
              message: "Author account created successfully",
            });
          }
        }
      );
    }
  );
});

module.exports = router;
