module.exports = function (config) {
    var webpackConfig = require('./webpack.config.js');
    var minimist = require('minimist');

    var configObject = {
        basePath: 'src',
        frameworks: ['jasmine'],
        files: ['index.spec.ts'],
        reporters: ['dots'],
        preprocessors: {
            'index.spec.ts': ['webpack', 'sourcemap']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            devtool: 'inline-source-map'
        },
        webpackMiddleware: {
            noInfo: true
        }
    };

    configObject.browsers = ['PhantomJS'];

    config.set(configObject);
};
