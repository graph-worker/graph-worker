const path = require("path");

module.exports = {
  mode: "development",
  // devtool: "sourcemap",
  entry: {
    index: "./src/index.js",
    sw: "./src/sw.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  }
};
