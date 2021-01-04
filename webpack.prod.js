const merge = require('webpack-merge');
const config = require('./webpack.config');
const { DefinePlugin } = require('webpack');

module.exports = merge(config, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new DefinePlugin({
            "BASEURL": JSON.stringify("http://167.172.122.49/api")
        }),
    ]
})