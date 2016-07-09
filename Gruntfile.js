// Gruntfile.js
module.exports=function(grunt) {

// Loading
// One task: grunt.loadNpmTasks('grunt-contrib-jshint');
// Many tasks
[
 'grunt-contrib-jshint',
 'grunt-contrib-csslint',
 'grunt-html',
 'grunt-contrib-clean',
 'grunt-contrib-concat',
 'grunt-contrib-cssmin',
 'grunt-contrib-htmlmin',
 'grunt-contrib-uglify',
 'grunt-processhtml',
 'grunt-hashres',
 'grunt-html-validation',
 'grunt-image-embed'
].forEach(function (g) {
	grunt.loadNpmTasks(g);
});

// Configuration
grunt.initConfig({
	jshint: {
		options: {
			curly: true,
			eqeqeq: true
		},
		target1: ['Gruntfile.js','src/js/*.js','!src/**/*.js']
	},
    htmllint:  {
            options: {
                path: false,
                reportpath: false // output to console
            },
            src: [
                'src/*.html', // Include all HTML files in this directory.
                '!src/*.min.html' // Exclude any files ending with `.min.html`
            ]
        },
    csslint:  {
            options: {
           
            },
            src: [
                'src/css/*.css', // Include all HTML files in this directory.
                '!src/css/*.min.css' // Exclude any files ending with `.min.html`
            ]
        },
  concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/jquery.js','src/js/bootstrap.js','src/js/question.js','src/js/quiz.js','src/js/game.js','src/js/app.js','!src/**/*.min.js'],
        dest: 'stage/js/app.min.js'
      }
    },
    clean : {
    	target1 : {
        	src : [ 'src/**/*.*~', 'dist/*', 'stage/*']
    	}
	},
cssmin: {
  minify: {
    files: [{
      expand: true,
      cwd: 'src/css',
      src: ['**/*.css', '!**/*.min.css'],
      dest: 'dist/css',
      ext: '.min.css'
    }]
  },
  options: {
    shorthandCompacting: false,
    roundingPrecision: -1
  },
  combine: {
    files: {
      'dist/css/app.min.css': ['!dist/css/*.min.css', 'dist/css/*.css']
    }
  }
},
htmlmin: {
  dist : {                                     // Task
      options: {                                 // Target options
        removeComments: true,
        collapseWhitespace: true
      },
      files: {                                   // Dictionary of files
        'dist/index.html': 'stage/index.html'     // 'destination': 'source'
      }
  }
 },
 uglify: {
        report: 'min',
	target1: {
		files : {
			'dist/js/app.min.js':  ['stage/js/app.min.js']
		}
        }
 },
 processhtml: {
	options: {
	},
	dist : {
		files: {
		  'stage/index.html': ['src/index.html']
		}
	}
 }
});

// Default task
grunt.registerTask('default',['clean','cssmin','concat','uglify','processhtml','htmlmin']);
grunt.registerTask('hard',['clean','jshint','csslint','htmllint','concat']);

};
