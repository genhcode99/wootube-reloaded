// 완전 오래된 자바스크립트 코드만 이해할 수 있다!
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");


module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js"
  },
  mode: "development",
  watch: true,
  plugins: [new MiniCssExtractPlugin({
    filename: "css/styles.css",
  })],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
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
      },
      {
        test: /\.scss$/,
        //마지막에 사용될 로더 부터  처음 사용할 로더 까지 반대 순서로 적어야 한다.(웹팩은 아래부터 읽어나감.)
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
    ]
  }
};