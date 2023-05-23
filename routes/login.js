const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_reference",
});

router.get("/:cond", (req, res, next) => {
  const cond = req.params.cond;
  if (cond == "true") {
    res.render("login", { msg: "Register Success!", cond: true });
  } else if (cond == "fail") {
    res.render("login", { msg: "Wrong Email or Password!", cond: false });
  } else {
    res.redirect("/register");
  }
});

router.get("/", (req, res, next) => {
  res.render("login", { msg: "", cond: false });
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
            console.log(password, docs[0].password);
            if (err) {
              console.log(err);
              res.json({
                message: "Terdapat Kesalahan silahkan login kembali",
              });
            } else {
              if (result) {
                res.redirect("/upload");
              } else {
                console.log("password did not match", result);
                res.redirect("/login/fail");
              }
            }
          });
        } else {
          res.redirect("/login/fail");
        }
      } else {
        console.error(err);
      }
    }
  );
});

module.exports = router;
