const webpack = require('webpack');
const path = require('path');
const buildPath = path.join(__dirname, './build');
const sourcePath = path.join(__dirname, './src');

module.exports = {
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
    watch: true,
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: buildPath,
        filename: 'app.js',
    },
    module: {
        loaders: [
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: {loader: 'babel-loader'}},
            {
                test: /\.scss$/, exclude: /node_modules/, use: [
                    {loader: 'style-loader', options: {sourceMap: true}},
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}}
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            LANG: JSON.stringify("en")
        })
    ],
    resolve: {
        alias: {
            actions: path.resolve(__dirname, 'src/actions/'),
            api: path.resolve(__dirname, 'src/api/'),
            components: path.resolve(__dirname, 'src/components/'),
            containers: path.resolve(__dirname, 'src/containers/'),
            reducers: path.resolve(__dirname, 'src/reducers/'),
            sagas: path.resolve(__dirname, 'src/sagas/'),
            constants: path.resolve(__dirname, 'src/constants.js'),
        },
        modules: [
            "node_modules",
        ],
        extensions: [".js", ".jsx"],
    },
    node: {
        fs: 'empty',
    },
    externals: [
        {'./cptable': 'var cptable'},
        {'./jszip': 'jszip'}
    ]
};