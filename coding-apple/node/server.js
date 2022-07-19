const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const MongoClient = require("mongodb").MongoClient;

var db;

MongoClient.connect(
  "mongodb+srv://hanshin:hanshin12@atlascluster.vpb5laj.mongodb.net/?retryWrites=true&w=majority",
  function (err, client) {
    // if (err) return console.log("err");
    app.listen(8082, function () {
      console.log("서버는 열림");
    });
    db = client.db("todoapp");
    console.log(db);
  }
);

app.post("/add", function (req, res) {
  res.send("완료");
  console.log(req.body);
});

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/write", function (req, res) {
  res.render("write.ejs");
});
