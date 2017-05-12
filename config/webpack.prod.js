var path = require('path'),
    webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',

    entry: './src/index.js',

    output: {
        path: path.resolve(__dirname, '../www/gamee-emulator'),
        filename: 'gamee-tools.js'
    },

    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
}