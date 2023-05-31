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
router.get("/read/:id", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE id = ${req.params.id}`,
    function (err, result) {
      if (err) throw err;
      res.render("read", { data: result });
    }
  );
});

router.get("/computer", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'computer'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", { data: result, category: "Computer" });
    }
  );
});

router.get("/data_mining", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'data_mining'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", { data: result, category: "Data Mining" });
    }
  );
});

router.get("/software_engineering", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'software_engineering'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", {
        data: result,
        category: "Software Engineering",
      });
    }
  );
});

router.get("/uiux", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'uiux'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", {
        data: result,
        category: "UIUX",
      });
    }
  );
});

router.get("/security", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'security'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", {
        data: result,
        category: "Security",
      });
    }
  );
});

router.get("/database", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'database'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", {
        data: result,
        category: "Database",
      });
    }
  );
});

router.get("/web_development", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'webdev'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", {
        data: result,
        category: "Web Development",
      });
    }
  );
});

router.get("/software_testing", (req, res, next) => {
  db.query(
    `SELECT * FROM reference WHERE kategori = 'software_testing'`,
    function (err, result) {
      if (err) throw err;
      res.render("category", {
        data: result,
        category: "Software Testing",
      });
    }
  );
});

module.exports = router;
