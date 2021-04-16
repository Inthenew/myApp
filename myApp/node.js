var express = require("express");
var ejs = require("ejs");

var app = express();
app.set("views", "views");
app.engine(".html", ejs.__express);
app.set("view-engine", "html");
app.get("/", function(req, res) {
  res.render("game.html");
});
app.get("/signup", function(req, res) {
  res.render("signup.html");
});
let username = null;
let password = null;
var usernames = {};
var passwords = {};

app.get("/r/:username/:password/:s", function(req, res) {
  if (req.params.s === "true") {
    usernames[req.params.username] = req.params.username;
    passwords[req.params.password] = req.params.password;
    username = req.params.username;
    password = req.params.password;
    console.log(
      `Signup: username: ${usernames[req.params.username]} password: ${
        req.params.password
      };`
    );
  } else {
    usernames[req.params.username] = req.params.username;
    passwords[req.params.password] = req.params.password;
    username = req.params.username;
    password = req.params.password;
    console.log(
      `login: username: ${usernames[req.params.username]} password: ${usernames[req.params.password]};`
    );
  }
  res.render("redirect.html");
});
app.get("/start", function(req, res) {
  if (username !== null) {
    res.render("start.html");
  } else {
    res.send("<h1>Please login</h1>");
  }
});
app.get("/login", function(req, res) {
  res.render("login.html");
});
app.get("/jade", function(req, res) {
  if (username !== null) {
    app.set("view engine", "jade");
    res.render("test", {
      name: String(username)
    });
  } else {
    res.send("<h1>Please login</h1>");
  }
});
app.get("/*", function(req, res) {
  res.render("404.html");
});
function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https

  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}

app.all("*", checkHttps);
app.listen(8080);
