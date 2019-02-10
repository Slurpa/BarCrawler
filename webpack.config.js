module.exports = {
    entry: './src/main/webapp/index.js',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/grails-app/assets/javascripts',
        publicPath: '/assets',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './grails-app/assets/javascripts'
    }
};