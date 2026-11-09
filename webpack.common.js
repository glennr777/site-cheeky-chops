const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { plugin } = require('postcss');

module.exports = {
  entry: {
    index: './src/index.js',
    rosies: './src/rosies.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader' },
      {
        test: /\.(ico)$/,
        exclude: /node_modules\//,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash]-[name].[ext]'
          }
        }
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: "file-loader",
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]'
          },
        },
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.template.ejs',
      inject: 'body',
      inlineSource: '.(js|css)$',
      filename: 'index.html',
      chunks: ['index'],
      scriptLoading : 'defer'
    }),
    new HtmlWebpackPlugin({
      template: './src/rosies.template.ejs',
      inject: 'body',
      inlineSource: '.(js|css)$',
      filename: 'rosies/index.html',
      chunks: ['rosies'],
      scriptLoading : 'defer'
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000
  },
  optimization: {
    splitChunks: {
      minChunks: 2,
    }
  }
};
