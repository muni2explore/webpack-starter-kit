var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var libraryName = 'smart-app';
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env, argv) => ({

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
        rules: [
            {
                test: /\.(ttf|eot|svg|woff|woff2|gif|eot|svg|png|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    argv.mode === 'production' ? MiniCssExtractPlugin.loader : "style-loader",
                    /*MiniCssExtractPlugin.loader,
                    "style-loader",*/
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
            }
        ]
    },
    optimization: {
        minimizer: function(){
            console.log(argv.mode);
            return argv.mode === 'production'? [
                    new OptimizeCSSAssetsPlugin({}),
                    new UglifyJsPlugin()
                ]: []; 
        }(),
        splitChunks: {
            cacheGroups: {
                /*vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true
                },*/
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
                
            }
        }
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
        }),
        /*new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        })*/
    ]
});