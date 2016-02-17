module.exports = function (config) {
    var webpackConfig = require('./webpack.config.js');
    var minimist = require('minimist');

    var configObject = {
        basePath: 'src',
        frameworks: ['jasmine'],
        files: ['stutz.spec.ts'],
        reporters: ['dots'],
        preprocessors: {
            'stutz.spec.ts': ['webpack', 'sourcemap']
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
