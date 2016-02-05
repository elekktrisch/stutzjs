module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'dist/stutz.js',
            'dist/stutz.spec.js'
        ],
        exclude: [
        ],
        preprocessors: {},
        reporters: ['dots'],
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};