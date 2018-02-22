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
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const path = require("path");
// const Package = require("./package.json");
// const isProd = process.argv.indexOf("-p") !== -1;
// const isHTTPS = process.argv.indexOf("--https") !== -1;
// const filename = Package.name + "-aio" + (isProd ? ".min" : "");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const paths = {
    build: path.join(__dirname, "dist", "assets"),
    dist: path.join(__dirname, "dist"),
    src: path.join(__dirname, "src")
};

function dirname(path) {
    return path.split(/[\/\\]/).pop();
}

module.exports = {
    devServer: {
        hot: true,
        port: 3000,
        contentBase: paths.dist,
        publicPath: `/${dirname(paths.build)}`,
        watchContentBase: true
    },
    entry: {
        bundle: path.join(paths.src, "js", "index.jsx")
    },
    output: {
        libraryTarget: "umd",
        path: paths.build,
        filename: path.join("js", "[name].js")
    },
    module: {
        rules: [
            {
                test: /\.(eot|gif|png|svg|ttf|woff|woff2)$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {loader: "css-loader"},
                        {loader: "less-loader"}
                    ]
                })
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: path.join("css", "[name].css"),
            allChunks: true
        })
    ],
    resolve: {
        extensions: [".js", ".jsx"],
        modules: [paths.src, "node_modules"]
    }
};
