const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const VENOR = ["react"];

module.exports = {
  mode: "development",
  entry: {
    bundle: "./src/index.js",
    vendor: VENOR
  },
  // entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "images/[name].[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                // modules: true
              }
            }
          ]
        })
        // use: [
        //   "style-loader",
        //   {
        //     loader: "css-loader",
        //     options: {
        //       // modules: true
        //     }
        //   }
        // ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["build/*"], { dry: false, verbose: true }),
    new ExtractTextPlugin("css/[name].[hash].css"),
    new HtmlWebpackPlugin({
      template: "index.html"
    })
  ],
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor", // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: {
          // 抽离自己写的公共代码，utils这个名字可以随意起
          chunks: "initial",
          name: "utils", // 任意命名
          minSize: 0 // 只要超出0字节就生成一个新包
        }
      }
    }
  },
  resolve: {
    alias: {
      fq: path.resolve(__dirname, "./images")
    }
  }
};

console.log(__dirname);
