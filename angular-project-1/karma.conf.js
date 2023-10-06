// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-sonarqube-reporter'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-junit-reporter'),
            require('karma-spec-reporter')
        ],
        client: {
            jasmine: {
            },
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        jasmineHtmlReporter: {
            suppressAll: true // removes the duplicated traces
        },
        coverageIstanbulReporter: {
            // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
            reports: ['html', 'lcovonly', 'text-summary'],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: path.join(__dirname, '../coverage/angular-project-1/test/component'),

            // Combines coverage information from multiple browsers into one report rather than outputting a report
            // for each browser.
            combineBrowserReports: true,

            // if using webpack and pre-loaders, work around webpack breaking the source path
            fixWebpackSourcePaths: true,

            // enforce percentage thresholds
            // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
            thresholds: {
                emitWarning: false, // set to `true` to not fail the test command when thresholds are not met
                // thresholds for all files
                global: {
                    statements: 95,
                    lines: 95,
                    branches: 95,
                    functions: 95
                }
            }
        },
        junitReporter: {
            outputDir: '../coverage/angular-project-1/test-junit-reports', // results will be saved as $outputDir/$browserName.xml
            outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
            useBrowserName: false, // add browser name to report and classes names
        },
        sonarqubeReporter: {
            basePath: 'src/app', // test files folder
            filePattern: '**/*spec.ts', // test files glob pattern
            encoding: 'utf-8', // test files encoding
            outputFolder: '../coverage', // report destination
            legacyMode: false, // report for Sonarqube < 6.2 (disabled)
            reportName: (metadata) => 'angular-project-1.xml'
        },

        reporters: ['spec', 'sonarqube', 'coverage-istanbul', 'junit', 'progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        customLaunchers: {
            HeadlessChrome: {
                    base: 'ChromeHeadless',
                    flags: ['--no-sandbox']
            }
        },
        restartOnFileChange: true
    });
};
