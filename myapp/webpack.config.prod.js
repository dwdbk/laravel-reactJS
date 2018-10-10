const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, './back-office');
const sourcePath = path.resolve(__dirname, './src');

const debug = process.env.NODE_ENV !== "production";

/**
 * Webpack development configuration
 */
module.exports = {
    mode: 'production',
    context: sourcePath,
    entry: {
        app: './index.js',
        vendor: [
            'babel-polyfill',
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'xlsx',
            'file-saver'
        ]
    },
    output: {
        path: buildPath,
        filename: 'app.js',
    },
    devtool: 'source-map',
    module: {

        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {loader: 'babel-loader'}
            },
            {
                test: /\.scss$/, exclude: /node_modules/, use: [
                    {loader: 'style-loader', options: {sourceMap: true}},// creates style nodes from JS strings
                    {loader: 'css-loader', options: {sourceMap: true}},// translates CSS into CommonJS
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}} // compiles Sass to CSS
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|eot|woff|ttf|woff2)$/,
                use: [
                    'file-loader?name=[name].[ext]'
                ]
            },
            {test: /\.svg$/, loader: 'svg-url-loader'},
            {
                test: /\.(js|jsx)$/,
                include: [path.resolve(__dirname, "./src")],
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', "less-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                ENV: JSON.stringify(process.env.ENV),
                API_URL: JSON.stringify(process.env.API_URL),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new HtmlWebpackPlugin({
            title: 'Socle reactJS',
            template: sourcePath + '/index.html',
            // minify: false,
            minify: debug ? false : {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                removeComments: true,
                removeEmptyAttributes: true,
            },
            hash: true,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: '[name].js',
        }),
        new webpack.optimize.UglifyJsPlugin({

            // Eliminate comments
            comments: false,

            // Compression specific options
            compress: {
                // remove warnings
                warnings: false,

                drop_debugger: true,
                // Drop console statements
                drop_console: false
            },
        })
    ],
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'src/actions/'),
            api: path.resolve(__dirname, 'src/api/'),
            components: path.resolve(__dirname, 'src/components/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            config: path.resolve(__dirname, 'src/config/'),
            constants: path.resolve(__dirname, 'src/constants/'),
            localstorage: path.resolve(__dirname, 'src/localstorage/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            sagas: path.resolve(__dirname, 'src/sagas/'),
            styles: path.resolve(__dirname, 'src/styles/'),
            i18n: path.resolve(__dirname, 'src/i18n.js'),
        },
        extensions: ['.js', '.jsx'],
        modules: [
            'node_modules'
        ]
    },
    node: {
        fs: 'empty',
    },
    externals: [
        {'./cptable': 'var cptable'},
        {'./jszip': 'jszip'}
    ]
};

