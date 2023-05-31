require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

router.get("/", (req, res, next) => {
  db.query("SELECT * FROM reference", function (err, rows) {
    res.render("home", { data: rows });
  });
});

module.exports = router;
