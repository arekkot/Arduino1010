'use strict';

module.exports = (config) => {
    const configuration = {
        basePath: './',
        frameworks: [
            'jasmine',
            'jasmine-matchers'
        ],
        files: [
            'test/.tmp/**/*.spec.js'
        ],
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-matchers'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: [
            'Chrome'
        ],
        singleRun: true,
        autoWatch: false
    };

    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
        configuration.customLaunchers = {
            'chrome-travis-ci': {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        };
        configuration.browsers = ['chrome-travis-ci'];
    }

    config.set(configuration);
};
