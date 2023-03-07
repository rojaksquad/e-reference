require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const path = require("path");

// Middleware for json and urlencoded requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_reference',
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to MySQL!");
  }
});

// Routes middleware
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
