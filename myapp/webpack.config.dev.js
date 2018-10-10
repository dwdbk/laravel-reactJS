const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const buildPath = path.resolve(__dirname, './build');
const sourcePath = path.resolve(__dirname, './src');
const publicPath = path.resolve(__dirname, 'public');

const debug = process.env.NODE_ENV !== "production";

/**
 * Webpack development configuration
 */

module.exports = {
    mode: 'development',// "production" | "development" | "none"
    context: sourcePath,
    entry: {
        app: './index.js',
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
        ]
    },
    output: {
        path: buildPath,
        filename: '[name].js',
        // publicPath: "/assets/", // string    // the url to the output directory resolved relative to the HTML page
        // library: "MyLibrary", // string,
        // the name of the exported library
        // libraryTarget: "umd", // universal module definition    // the type of the exported library
    },
    optimization: {
        /*runtimeChunk: true,
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    chunks: "initial",
                    test: path.resolve(__dirname, "node_modules"),
                    name: "vendor",
                    enforce: true
                },
                commons: {
                    chunks: "initial",
                    minChunks: 3,
                    name: "commons",
                    enforce: true
                }
            }
        }*/
    },
    module: {
        rules: [
            {
                test: /\.m?(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                  /*  options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"]
                    }*/
                }
            },
            {
                test: /\.scss$/, exclude: /node_modules/, use: [
                    {loader: 'style-loader', options: {sourceMap: true}},// creates style nodes from JS strings
                    {loader: 'css-loader', options: {sourceMap: true}},// translates CSS into CommonJS
                    {
                        loader: 'postcss-loader', options: {
                            sourceMap: true, plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader', options: {
                            sourceMap: true, plugins: function () { // post css plugins, can be exported to postcss.config.js
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    } // compiles Sass to CSS
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
                test: /\.(less|css)$/,
                use: ['style-loader', 'css-loader']
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
        new HtmlWebpackPlugin({
            title: 'Socle reactJS',
            template: publicPath + '/index.html',
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
        new BrowserSyncPlugin({
            files: "build/!**!/!*.*",
            hostname: "localhost",
            port: 9090,
            server: {baseDir: ['build']/*, middleware: [jsonServerProxy] */},
            reloadDelay: 50,
            injectChanges: false,
            reloadDebounce: 500,
            reloadOnRestart: true
        })
    ],
    resolve: {
        // directories where to look for modules
        extensions: [".js", ".json", ".jsx", ".css"],
        modules: [
            'node_modules',
        ],
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
        }
    },
    performance: {
        /*   hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
           maxEntrypointSize: 400000, // int (in bytes)
           assetFilter: function (assetFilename) {
               // Function predicate that provides asset filenames
               return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
           }*/
    },
    devtool: 'source-map', // enum  // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    node: {},
    externals: [],  // Don't follow/bundle these modules, but request them at runtime from the environment
};

