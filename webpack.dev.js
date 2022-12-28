const { merge } = require('webpack-merge')
const common  = require('./webpack.common')

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-source-map",
    // https://webpack.js.org/guides/hot-module-replacement/
    devServer: {
        static: './dist',
        hot: true,
    },
})