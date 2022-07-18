const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const MongoClient = require("mongodb").MongoClient;
const mongoAddress =
  "mongodb+srv://hanshin:hanshin!23@atlascluster.vpb5laj.mongodb.net/?retryWrites=true&w=majority";

var db;
MongoClient.connect(mongoAddress, function (error, client) {
  if (error) return console.log("error?");
  db = client.db("todoapp");

  app.post("/add", function (req, res) {
    res.send("완료");
    console.log(req.body);
    db.collection("count").findOne(
      { title: "boardCount" },
      function (err, result) {
        console.log(result);
        var totalPost = result.totalPost;
        db.collection("post").insertOne(
          { _id: totalPost + 1, title: req.body.title, date: req.body.date },
          function (err2, result2) {
            console.log("저장완료");
            db.collection("count").updateOne(
              { title: "boardCount" },
              { $inc: { totalPost: 1 } },
              function (err3, result3) {
                if (err3) {
                  return console.log(err);
                }
              }
            );
          }
        );
      }
    );
  });
});

app.listen(8080, function () {});

app.get("/", function (req, res) {
  res.render("index.ejs");
});

app.get("/write", function (req, res) {
  res.render("write.ejs");
});

app.get("/list", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (err, result) {
      console.log(result);
      res.render("list.ejs", { posts: result });
    });
});
