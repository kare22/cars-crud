const path = require('path');

const plugins = [];

module.exports = {
    devServer: {
        open: 'Google Chrome',
        host: 'localhost',
        hot: true,
        disableHostCheck: true,
        https: false,
    },

    configureWebpack: {
        entry: {
            app: './src/main.js',
        },

        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@mocks': path.join(__dirname, 'mocks'),
            },
        },

        optimization: {
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: 'initial',
                        minChunks: 2,
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: 'initial',
                        name: 'vendor',
                        priority: 10,
                        enforce: true,
                    },
                },
            },
        },

        plugins,
        devtool: 'source-map',
    },
};