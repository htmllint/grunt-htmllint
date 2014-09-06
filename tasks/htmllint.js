'use strict';

module.exports = function(grunt) {
    grunt.registerMultiTask('htmllint', 'HTML5 linter and validator.', function () {
        var htmllint = require('htmllint');

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            force: false
        });

        // whether or not we should fail the task on linting errors
        var force = options.force;
        delete options.force; // delete it, don't want to interfere with htmllint opts

        this.filesSrc.forEach(function (filePath) {
            if (!grunt.file.exists(filePath)) {
                grunt.log.warn('Source file "' + filePath + '" not found.');
                return;
            }

            var fileSrc = grunt.file.read(filePath),
                issues = htmllint(fileSrc, options);

            issues.forEach(function (issue) {
                var logMsg = grunt.template.process([
                    '<%= filePath %> ', // start with file path
                    '(<%= issue.line %>, <%= issue.index %>): ', // print error location
                    '<%= issue.msg %>' // then print the message
                ].join(''), { // options
                    data: {
                        filePath: filePath,
                        issue: issue
                    }
                });
                grunt.log.error(logMsg);
            });
        });

        if (this.errorCount && !force) {
            return false;
        }
    });
};
