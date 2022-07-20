var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;
  var template = null;

  if (pathname === "/") {
    if (queryData.id) {
      fs.readFile(`data/${queryData.id}`, "utf-8", function (err, description) {
        fs.readdir("./data", function (error, filelist) {
          var list = "<ul>";
          filelist.map(
            (x) => (list += `<li><a href="/?id=${x}">${x}</a></li>`)
          );
          list += "</ul>";
          var template = `
            <!doctype html>
            <html>
            <head>
                <title>WEB2 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <a href="/create">create</a>
                <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
          response.writeHead(200);
          response.end(template);
        });
      });
    } else {
      title = "Welcome";
      description = "Hello, Node.js";
      fs.readdir("./data", function (error, filelist) {
        var list = "<ul>";
        filelist.map((x) => (list += `<li><a href="/?id=${x}">${x}</a></li>`));
        list += "</ul>";
        var template = `
            <!doctype html>
            <html>
            <head>
                <title>WEB2 - ${title}</title>
                <meta charset="utf-8">
            </head>
            <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <a href="/create">create</a>
                <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
        response.writeHead(200);
        response.end(template);
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, filelist) {
      title = "WEB - create";
      var template = `
      <!doctype html>
      <html>
      <head>
          <title>${title}</title>
          <meta charset="utf-8">
      </head>
      <body>
      <form action="http://localhost:3000/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p><input type="submit"></>
        
      </form>
      </body>
      </html>
      `;
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    console.log(body);
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var template = null;
      var description = post.description;
      console.log(post);
    });
    response.writeHead(200);
  } else {
    response.writeHead(404);
    response.end("Not Found");
  }
});
app.listen(3002);
