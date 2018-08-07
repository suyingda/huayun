let express = require("express");
let webpack = require("webpack");
const fs = require("fs");
let app = express();
let port;

let webpackconfig = require("./webpack.dev.config");
webpackconfig(app);
// app.use(express.static('./public'));
app.get("*", function(req, res, next) {
  next();
});

app.listen(port || 3000, function(e) {
  console.log(`server start at ${port}`);
});
