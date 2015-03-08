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

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
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
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'htmllint', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
