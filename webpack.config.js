var path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        sourceMapFilename: "index.js.map",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader', 'source-map-loader']
            }, {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            }
        ]
    },
    externals: {
        "@gisatcz/ptr-utils": "@gisatcz/ptr-utils",
        "@gisatcz/ptr-core": "@gisatcz/ptr-core",
        "@manaflair/redux-batch": "@manaflair/redux-batch",
        "connected-react-router": "connected-react-router",
        "lodash": "lodash",
        "path": "path",
        "moment": "moment",
        "isomorphic-fetch": "isomorphic-fetch",
        "query-string": "query-string",
        "react": "react",
        "react-dom": "react-dom",
        "react-redux": "react-redux",
        "react-router": "react-router",
        "react-router-dom": "react-router-dom",
        "redux": "redux",
        "redux-thunk": "redux-thunk",
        "redux-logger": "redux-logger",
        "reselect": "reselect",
        "re-reselect": "re-reselect"
    }
};