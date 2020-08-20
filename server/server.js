const express = require("express");
const fs = require("fs");
const historyApiFallback = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const config = require("../config/config");
const webpackConfig = require("../webpack.config");

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

const busboy = require("connect-busboy");

/*
### Difference between busboy and connect-busboy - Connect is a middleware layer for building servers in Node.js. It was originally the basis for the Express web framework.

What middleware here really means is essentially an array of functions that conform to an interface which get called on each request in the order they are defined.

connect-busboy wraps the busboy library into a connect compatible middleware. You can see in the source it really just returns a function.
 */

const busboyBodyParser = require("busboy-body-parser");
// Body parsing for multipart/form-data forms in Express. It will add regular fields to req.body as per body-parser but will also add uploaded files to req.files.

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;

const app = express();
app.use(busboy());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(busboyBodyParser());

// API routes
require("./routes")(app);

// https://github.com/webpack/webpack-dev-middleware#usage
if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, "../client/public"),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, "../dist")));
} else {
  app.use(express.static(path.resolve(__dirname, "../dist")));
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}

app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.log(err);
  }

  console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", port);
});

module.exports = app;
