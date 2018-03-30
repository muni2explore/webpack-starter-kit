var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var libraryName = 'smart-app';

module.exports = {
    entry: {
        app: path.resolve(__dirname, './src/js/app.js'),
        style: path.resolve(__dirname, './src/scss/style.scss')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                //MiniCssExtractPlugin.loader,
                "style-loader",
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }
                },
                'sass-loader'
            ],
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // TODO: switch to [contenthash] as soon as MiniCssExtractPlugin supports it
            filename: "css/[name].css"
        })
    ]
};