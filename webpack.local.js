const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const { DefinePlugin } = require('webpack');

module.exports = merge(config, {
    plugins: [
        new DefinePlugin({
            "LOCAL": JSON.stringify(true),            
            "BASEURL": JSON.stringify("http://localhost:8081"),
        }),
    ]
})