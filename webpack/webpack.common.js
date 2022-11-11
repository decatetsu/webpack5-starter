const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // List of bundle entries
    entry: {
        // bundle_name: path
        app: path.resolve(__dirname, '../src/js/index.js')
    },
    output: {
        // path and filename for bundles (name means bundle_name)
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, '../build'),
    },
    optimization: {
        // If you have a lot of vendor packages you need to make
        // mode advanced configuration of splitChunks
        splitChunks: {
            chunks: 'all',
            name: false,
        },
    },
    plugins: [
        // Cleans output folder
        new CleanWebpackPlugin(),
        // Copying public static files (images, fonts etc)
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/public'),
                    to: 'public',
                }
            ],
        }),
        // Use html as template to automatically insert
        // necessary js and css (if you need more pages,
        // create array of them and map to HtmlWebpackPlugin
        // objects)
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
        }),
    ],
    module: {
        rules: [
            // Assets rule
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                type: 'asset'
            },
        ],
    },
};
