const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_reference",
});

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM reference", function (err, rows) {
    res.render("home", { data: rows });
  });
});

module.exports = router;
