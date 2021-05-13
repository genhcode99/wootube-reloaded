// 완전 오래된 자바스크립트 코드만 이해할 수 있다!
const path = require("path");


module.exports = {
  entry: "./src/client/js/main.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"),
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            ['@babel/preset-env', {
              targets: "defaults"
            }]
          ]
        }
      }
    }]
  }
};