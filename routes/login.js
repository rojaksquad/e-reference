const express = require("express");
const mysql = require("mysql");
const bycrypt = require("bcrypt");

const router = express.Router();

const db = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
  });	  

router.get("/", (req,res,next) => {
	res.render("login");
});

router.post('/', (req, res) => {
	"SELECT email FROM users WHERE email = ?",
    [email], (err, docs) => {
    if (!err) {
        if (docs) {
          bcrypt.compare(req.body.password, docs.password, function(err, result) {
            if (err) {
              console.log(err);
              res.render('login', {msg : "Terdapat kesalahan, silahkan login kembali!", auth : false})
            }
            else {
                if (result) {
                  res.render('home', {msg: '', auth : true, email : req.body.email})
                }else{
                  res.render('login', {msg : "Password salah!", auth : false})
                }
            }
          });
        } else {
          res.render('login', {msg : "Akun salah!", auth : false})
        }
    } else {
        console.error(err);
    }
}})

module.exports = router ;