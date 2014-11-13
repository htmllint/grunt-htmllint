'use strict';

var reportTemplate = [
    '<%= filePath %>: (<%= issue.code %>), ',
    'line <%= issue.line %>, col <%= issue.column %>, ',
    '<%= issue.msg %>'
].join('');

module.exports = function (grunt) {
    grunt.registerMultiTask('htmllint', 'HTML5 linter and validator.', function () {
        var htmllint = require('htmllint'),
            Promise = require('promise');
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            force: false,
            maxerr: 30,
            plugins: [],
            htmllintrc: false
        });

        var force = options.force;
        delete options.force;

        if (options.htmllintrc) {
            options = grunt.file.readJSON('./.htmllintrc');
        }

        var plugins = options.plugins || [],
            errorFiles = 0,
            skippedFiles = 0;

        htmllint.use(plugins);

        delete options.plugins;
        delete options.htmllintrc;

        var lastPromise = Promise.resolve(null);
        this.filesSrc.forEach(function (filePath) {
            if (!grunt.file.exists(filePath)) {
                grunt.log.warn('Source file "' + filePath + '" not found.');
                return;
            }

            lastPromise = lastPromise.then(function (task) {
                if (options.maxerr <= 0) {
                    // don't lint the file
                    return false;
                }

                var fileSrc = grunt.file.read(filePath);

                return htmllint(fileSrc, options);
            }).then(function (issues) {
                if (issues === false) {
                    // skipped the file
                    skippedFiles++;
                    grunt.log.verbose.warn('Skipped file "' + filePath + '" (maxerr).');
                    return;
                }

                issues.forEach(function (issue) {
                    var logMsg = grunt.template.process(reportTemplate, {
                        data: {
                            filePath: filePath,
                            issue: {
                                code: issue.code,
                                line: issue.line,
                                column: issue.column,
                                msg: issue.msg || htmllint.messages.renderIssue(issue)
                            }
                        }
                    });
                    grunt.log.error(logMsg);
                });

                if (issues.length <= 0) {
                    grunt.log.verbose.ok(filePath + ' is lint free');
                } else {
                    errorFiles++;
                }

                options.maxerr -= issues.length;
            });
        });

        lastPromise
            .then(function () {
                var resultMsg = [
                    errorFiles,
                    ' file(s) had lint error out of ',
                    this.filesSrc.length, ' file(s). ',
                    '(skipped ', skippedFiles, ' files)'
                ].join('');

                if (this.errorCount) {
                    grunt.log.error(resultMsg);
                } else {
                    grunt.log.ok(resultMsg);
                }
            }.bind(this))
            .done(function () {
                done(this.errorCount === 0 || force);
            }.bind(this));
    });
};
