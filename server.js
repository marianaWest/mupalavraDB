// declare variables
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 7777;
const mongoose = require("mongoose");
const MupaTerm = require("./models/mupaTerm");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongoDB via mongoose
mongoose.connect(process.env.DB_STRING, { useNewUrlParser: true }, () => {
  console.log("Connected to database");
});

app.get("/", async (req, res) => {
  let termsCol;
  try {
    termsCol = await MupaTerm.find({});
    res.render("index.ejs", { termsCol });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.route("/addTerm").get((req, res) => {
  res.render("addTerm.ejs");
  console.log("add term");
});

app.post("/addTerm", async (req, res) => {
  const mupaTerm = new MupaTerm({
    term: req.body.term,
    description: req.body.description,
  });
  try {
    await mupaTerm.save();
    console.log(mupaTerm);
    res.redirect("/");
  } catch (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  }
});

// edit or update term
app.get("/edit/:id", async (req, res) => {
  let termsCol;
  let id = req.params.id;
  try {
    termsCol = await MupaTerm.find({});
    res.render("edit.ejs", { termsCol, id });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// edit post not working

app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  MupaTerm.findByIdAndRemove(id, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/");
  });
});

// initiatize server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
