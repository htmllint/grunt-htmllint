'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('htmllint', 'HTML5 linter and validator.', function () {
        var htmllint = require('htmllint');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            force: false,
            opts: null
        });

        var force = options.force,
            lintOpts = options.opts || {},
            maxerr = lintOpts.maxerr;

        this.filesSrc.every(function (filePath) {
            if (!grunt.file.exists(filePath)) {
                grunt.log.warn('Source file "' + filePath + '" not found.');
                return true;
            }

            lintOpts.maxerr = maxerr;

            var fileSrc = grunt.file.read(filePath),
                issues = htmllint(fileSrc, options);

            maxerr -= issues.length;

            issues.forEach(function (issue) {
                var logMsg = grunt.template.process([
                    '<%= filePath %>: ',
                    'line <%= issue.line %>, col <%= issue.column %>, ',
                    '<%= issue.msg %>'
                ].join(''), { // options
                    data: {
                        filePath: filePath,
                        issue: issue
                    }
                });
                grunt.log.error(logMsg);
            });

            return maxerr > 0;
        });

        if (this.errorCount && !force) {
            return false;
        }
    });
};
