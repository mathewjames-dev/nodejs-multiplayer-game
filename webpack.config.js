const path = require('path');

module.exports = {
    entry: {
        main: './public/scripts/main.js',
        vendor: './public/scripts/vendors/vendor.js',
    },
    output: {
        filename: './public/scripts/bundles/[name].bundle.js',
        path: path.resolve(__dirname),
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                // use: {
                //     loader: 'babel-loader',
                //     options: {
                //         presets: ['@babel/preset-env'],
                //         plugins: ["syntax-class-properties", "transform-class-properties"]
                //     }
                // }
            }
        ]
    }
};