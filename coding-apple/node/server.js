const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const MongoClient = require("mongodb").MongoClient;
const mongoAddress =
  "mongodb+srv://hanshin:hanshin@atlascluster.vpb5laj.mongodb.net/?retryWrites=true&w=majority";
MongoClient.connect(mongoAddress, function (error, client) {
  if (error) return console.log("서버 열림");
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
              function (err2, result3) {
                if (err2) {
                  return console.log(err);
                }
              }
            );
          }
        );
      }
    );
  });
  app.delete("/delete", function (req, res) {
    console.log(req.body);
    db.collection("post").deleteOne(
      { _id: parseInt(요청.body) },
      function (error, result) {
        console.log("삭제완료");
      }
    );
  });
});
var db;

app.listen(8080, function () {});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});

app.get("/list", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (err, result) {
      console.log(result);
      res.render("list.ejs", { posts: result });
    });
});
