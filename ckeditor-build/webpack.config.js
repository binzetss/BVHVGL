const path = require("path");

module.exports = {
  entry: "./src/ckeditor.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "ckeditor.js",
    library: "ClassicEditor",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      }
    ]
  }
};
