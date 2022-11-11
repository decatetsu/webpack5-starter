const path = require('path');
const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const ESLintPlugin = require('eslint-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
    // Building target
    target: 'web',
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    output: {
        chunkFilename: 'js/[name].chunk.js',
    },
    devServer: {
        client: {
            logging: 'warn',
        },
        hot: true,
        port: 3000,
        open: true,
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new ESLintPlugin({
            extensions: 'js',
            emitWarning: true,
            files: path.resolve(__dirname, '../src'),
        }),
        new StyleLintPlugin({
            files: [path.resolve(__dirname, 'src/**/*s?(a|c)ss')],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'babel-loader',
            },
            {
                test: /\.s?css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    // allows to use plugins such as autoprefixer
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    }
});
