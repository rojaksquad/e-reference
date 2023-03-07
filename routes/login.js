const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e_reference",
});

router.get("/", (req, res, next) => {
  res.render("login");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  db.query(
    "SELECT password FROM users WHERE email = ?",
    [email],
    async (err, docs) => {
      if (!err) {
        if (docs.length > 0) {
          bcrypt.compare(password, docs[0].password, function (err, result) {
            if (err) {
              console.log(err);
              res.json({
                message: "Terdapat Kesalahan silahkan login kembali",
              });
            } else {
              if (result) {
                res.redirect("/dashboard");
              } else {
                res.redirect("/login");
              }
            }
          });
        } else {
          res.redirect("/register");
        }
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = router;
