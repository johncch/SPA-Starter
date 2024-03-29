const { merge } = require("webpack-merge")
const config = require("./webpack.config")
const { DefinePlugin } = require("webpack")

module.exports = merge(config, {
    plugins: [
        new DefinePlugin({
            BASEURL: JSON.stringify("http://localhost:8081"),
            LOCAL: true,
        }),
    ],
})
