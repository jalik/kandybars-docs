/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Karl STEIN
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Package = require('./package.json');

const isDevMode = process.env.NODE_ENV !== 'production';
const assetsDir = 'assets';
const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');

module.exports = {
  devServer: {
    port: 3000,
  },
  entry: {
    bundle: path.join(srcPath, 'js', 'index.jsx'),
  },
  output: {
    libraryTarget: 'umd',
    path: distPath,
    filename: path.join(assetsDir, '[name].js'),
  },
  module: {
    rules: [
      {
        test: /\.(gif|png|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: assetsDir,
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          (isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader),
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(srcPath, 'html', 'index.html'),
      title: `${Package.name} v${Package.version}`,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [srcPath, 'node_modules'],
  },
};
