const express = require("express");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e_reference",
});

router.get("/", (req, res, next) => {
  res.json({
    message: "Admin Dashboard page",
  });
});

module.exports = router;
