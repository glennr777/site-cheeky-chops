const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common.js');

const config =
  merge(common, {
    mode: 'development',
    devtool: 'source-map',
  });

module.exports = config;