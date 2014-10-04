'use strict';

var reportTemplate = [
    '<%= filePath %>: ',
    'line <%= issue.line %>, col <%= issue.column %>, ',
    '<%= issue.msg %>'
].join('');

module.exports = function(grunt) {
    grunt.registerMultiTask('htmllint', 'HTML5 linter and validator.', function () {
        var htmllint = require('htmllint');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            force: false,
            maxerr: 30
        });

        var force = options.force,
            errorFiles = 0;

        delete options.force;

        this.filesSrc.every(function (filePath) {
            if (!grunt.file.exists(filePath)) {
                grunt.log.warn('Source file "' + filePath + '" not found.');
                return true;
            }

            var fileSrc = grunt.file.read(filePath),
                issues = htmllint(fileSrc, options);

            options.maxerr -= issues.length;

            issues.forEach(function (issue) {
                var logMsg = grunt.template.process(reportTemplate, {
                    data: {
                        filePath: filePath,
                        issue: issue
                    }
                });
                grunt.log.error(logMsg);
            });
            if (issues.length <= 0) {
                grunt.log.verbose.ok(filePath + ' is lint free');
            } else {
                errorFiles++;
            }

            return options.maxerr > 0;
        });

        var resultMsg = [
            errorFiles,
            ' file(s) had lint errors out of ',
            this.filesSrc.length, ' file(s).'
        ].join('');

        if (this.errorCount) {
            grunt.log.error(resultMsg);
        } else {
            grunt.log.ok(resultMsg);
        }

        return (this.errorCount === 0 || force);
    });
};
