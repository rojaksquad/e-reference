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
  res.json({
    message: "Admin Dashboard page",
  });
});

module.exports = router;
