const path = require('path');

module.exports = {
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './src'),
        compress: true,
        port: 8080,
        open: true,
    },
};