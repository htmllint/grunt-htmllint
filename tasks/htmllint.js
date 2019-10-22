'use strict';

var reportTemplate = [
    '<%= filePath %>: (<%= issue.code %>), ',
    'line <%= issue.line %>, col <%= issue.column %>, ',
    '<%= issue.msg %>'
].join('');

module.exports = function (grunt) {
    grunt.registerMultiTask('htmllint', 'HTML5 linter and validator.', function () {
        var htmllint = require('htmllint'),
            Promise = require('promise'),
            striptags = require('striptags');
        var done = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            force: false,
            plugins: [],
            htmllintrc: false
        });

        var force = options.force;
        delete options.force;

        var allowTags = options.allowTags;
        delete options.allowTags;

        if (options.htmllintrc) {
            var htmllintrcPath = options.htmllintrc === true ? '.htmllintrc' : options.htmllintrc;
            options = grunt.file.readJSON(htmllintrcPath);
        }
        var hasmax = options.hasOwnProperty('maxerr') && options.maxerr;

        var plugins = options.plugins || [],
            errorFiles = 0,
            skippedFiles = 0,
            errorAmount = 0;

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
                if (hasmax && options.maxerr <= 0) {
                    // don't lint the file
                    return false;
                }

                var fileSrc = grunt.file.read(filePath);
                if(allowTags){
                    fileSrc = striptags(fileSrc, allowTags);
                }
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

                errorAmount += issues.length;
                if (hasmax) {
                    options.maxerr -= issues.length;
                }
            }).catch(function (err) {
                grunt.log.error('Could not lint file ' + filePath + '; It might be malformed.', err);
            });
        });

        lastPromise
            .then(function () {

                var resultMsg = [
                    'encountered ', errorAmount, ' errors in total\n',
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
