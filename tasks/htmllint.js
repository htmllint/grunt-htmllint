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
            opts: null
        });

        var force = options.force,
            lintOpts = options.opts || {};

        if (!lintOpts.hasOwnProperty('maxerr')) {
            lintOpts.maxerr = 30;
        }

        this.filesSrc.every(function (filePath) {
            if (!grunt.file.exists(filePath)) {
                grunt.log.warn('Source file "' + filePath + '" not found.');
                return true;
            }

            var fileSrc = grunt.file.read(filePath),
                issues = htmllint(fileSrc, options);

            lintOpts.maxerr -= issues.length;

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
            }

            return lintOpts.maxerr > 0;
        });

        if (this.errorCount && !force) {
            return false;
        }

        grunt.log.ok(this.filesSrc.length + ' html files lint free');
        return true;
    });
};
