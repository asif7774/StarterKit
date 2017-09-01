// Gruntfile.js
module.exports = function (grunt) {
  /**
   * Dynamically load npm tasks
   */
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),
    
    // Watch task config
    watch: {
      sass: {
        files: "src/scss/{,*/}*.{scss,sass}",
        tasks: ['sass']
      }
    },
    // SASS task config
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          // destination                  // source file
          "app/assets/css/style.css" : "src/scss/style.scss"
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
            // destination                  // source file
            "app/assets/css/style.css" : "src/scss/style.scss"
        }
      }
    },
    // Browser Sync  config
    browserSync: {
	  default_options: {
	    bsFiles: {
	      src: [
	        "app/assets/css/*.css",
	        "app/{,*/}*.{html,php}"
	      ]
	    },
	    options: {
	      watchTask: true,
	      server: {
	        baseDir: "./app"
	      }
	    }
	  }
	}
  });


  /**
   * Default task
   * Run 'grunt' on the command line
   */
  grunt.registerTask('default', [
    'sass:dev',
    'browserSync', 
    'watch'
  ]);

  /**
   * Build task
   * Run 'grunt build' on the command line
   * Then compress all CSS files
   */
  grunt.registerTask('build', [
    'sass:dist'
  ]);
};