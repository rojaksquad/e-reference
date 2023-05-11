const express = require("express");
const mysql = require("mysql");
const flash = require('connect-flash');

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_reference",
});

router.get("/", (req, res, next) => {
  res.render('upload' , { message: "" });
});

router.post("/", (req, res, next) => {
  const { judul, penulis, publisher, kategori, deskripsi, tgl } = req.body;

  //check if reference is already inside the database
  db.query(
    "SELECT judul FROM reference WHERE judul = ?",
    [judul],
    async (err, results) => {
      if (err) {
        console.log(err);
        res.json({
          message: "There was an error",
        });
      }

      if (results.length > 0) {
        res.redirect("/upload");
        console.log("Judul sudah ada!, upload dengan judul berbeda.");
        return;
      }

      // put img files into folder
      if (req.files) {
        let imgFile = req.files.img;
        let imgFileName = imgFile.name;
        imgFile.mv("./uploads/img/" + imgFileName, (err) => {
          if (err) throw err;

          let pdfFile = req.files.pdf;
          let pdfFileName = pdfFile.name;
          pdfFile.mv("./uploads/pdf/" + pdfFileName, (err) => {
            if (err) throw err;

            //insert the data into database
            db.query(
              "INSERT INTO reference SET ?",
              {
                judul: judul,
                penulis: penulis,
                publisher: publisher,
                kategori: kategori,
                tgl: tgl,
                deskripsi: deskripsi,
                imgUrl: req.files.img.name,
                pdf: req.files.pdf.name,
              },
              (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("done");
                  res.render('upload', { message: "Upload Berhasil" });
                }
              }
            );
          });
        });
      }
    }
  );
});

module.exports = router;
