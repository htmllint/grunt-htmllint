'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Configuration to be run (and then tested).
        htmllint: {
            default_options: {
                options: {
                    force: true
                },
                src: ['test/fixtures/*.html']
            },
            rc_file: {
                options: {
                    force: true,
                    htmllintrc: true
                },
                src: ['test/fixtures/*.html']
            },
            permissive: {
                options: {
                    force: true,
                    'attr-bans': []
                },
                src: ['test/fixtures/*.html']
            },
            bail: {
                options: {
                    force: true,
                    maxerr: 1
                },
                src: ['test/fixtures/*.html']
            },
            htmllintrc: {
                options: {
                    force: true,
                    htmllintrc: 'test/fixtures/testrc.js'
                },
                src: ['test/fixtures/*.html']
            },
            fail: {
                src: ['test/fixtures/*.html']
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'nodeunit']);
};
