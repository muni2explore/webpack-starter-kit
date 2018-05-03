# Webpack Starter Kit

### Step 1:
Initialize the project with npm which creates package.json with default parameters.
<pre>
npm init -y
</pre>

### Step 2:
Next initialize source control by git init
<pre>
git init
</pre>

### Step 3:
Next install following webpack plugins by running following commands
```javascript

npm install webpack webpack-cli webpack-dev-server autoprefixer css-loader html-webpack-plugin mini-css-extract-plugin optimize-css-assets-webpack-plugin node-sass postcss-loader precss sass-loader style-loader file-loader url-loader copy-webpack-plugin --save-dev

```

### Step 4
Next create webpack.config.js file in root folder of your project. Then copy paste the following code snippet in your webpack.config.js file.

```javascript
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var libraryName = 'sustainability';

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
    module:{
        
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
            },{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                //"style-loader", 
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
    optimization: {
        minimizer: argv.mode === 'production' ? [
            new OptimizeCSSAssetsPlugin({})
        ] : []
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
        argv.mode === 'production' ? new CopyWebpackPlugin([
            { from: 'src/css/bootstrap.css', to: 'src/css/bootstrap.css' },
        ]) : new CopyWebpackPlugin([])
    ]
});
```
### Step 5:

Finally add the following commands in the package.json of scripts section.

```json
"scripts": {
    "start": "webpack-dev-server --progress --open --mode development",
    "dev": "webpack --mode development && rimraf dist/js/style.js",
    "prod": "webpack --mode production && rimraf dist/js/style.js"
}
```


