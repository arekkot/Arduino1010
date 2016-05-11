'use strict';

module.exports = (config) => {
    config.set({
        basePath: './',
        frameworks: [
            'jasmine',
            'jasmine-matchers'
        ],
        files: [
            'test/.tmp/**/*.spec.js'
        ],
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-jasmine-matchers'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['PhantomJS'],
        singleRun: true,
        autoWatch: false
    });
};
