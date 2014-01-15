module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		concat: {
			css: {
				src: ['assets/css/*', 'modules/*/css/*'],
				dest: 'dist/base.less'
			},
			js: {
				src: ['assets/js/*', 'modules/*/js/*'],
				dest: 'dist/base.js'
			}
		},


		less: {
			css: {
				files: {
					"dist/base.css": "dist/base.less"
				}
			}
		},

		autoprefixer: {

			single_file: {
				src: 'dist/base.css',
				dest: 'dist/base.css'
			}
		},

		cssmin: {
			dev: {
				files: {
					'dist/base.min.css': 'dist/base.css'
				}
			}
		},

		uglify: {
			my_target: {
				files: {
					'dist/base.min.js': 'dist/base.js'
				}
			}
		},

		jshint: {
			options: {
				'laxcomma': true
			},
			all: 'modules/*/js/*.js'
		},

		watch: {
			js: {
				files: ['assets/js/*', 'modules/*/js/*'],
				tasks: ['build-js']
			},
			css: {
				files: ['assets/css/*', 'modules/*/css/*'],
				tasks: ['build-css']
			}
		},


	});

	// Include Tasks
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	
	grunt.registerTask('build-js', ['concat:js', 'jshint']);
	grunt.registerTask('build-css', ['concat:css', 'less', 'autoprefixer']);

	// Default task(s).
	grunt.registerTask('default', ['build-css', 'build-js', 'watch']);
	grunt.registerTask('prod', ['build-css','cssmin', 'build-js', 'uglify']);
	
	

};