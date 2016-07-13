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
 'grunt-image-embed',
 'grunt-accessibility',
 'grunt-tenon'
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
 },
 validation: {
    options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
        remotePath: 'http://decodize.com/',
        relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'] //ignores these errors 
    },
    files: {
        src: ['src/*.html']
    }
},
accessibility: {
  options: {
    accessibilityLevel: 'WCAG2A'
  },
  test: {
    options: {
      urls: ['http://localhost']
    },
    src: ['example/test.html']
  }
},
tenon: {
        your_target: {
            urls: [
                {
                    url: 'http://www2.foo.com/content/te-com/usa/en/solid-state-connectors/product-1-2106003-1.html',
                    apiOptions: {
                        projectID: "MY_SPECIAL_PROJECT_ID",
                        importance: 3
                    }
                },
                'http://www2.foo.com/content/te-dev/usa/en/index.html'
            ]
        }
    }
});

// Default task
grunt.registerTask('default',['clean','cssmin','concat','uglify','processhtml','htmlmin']);
grunt.registerTask('hard',['clean','jshint','csslint','htmllint','concat']);
grunt.registerTask('access',['validation','accessibility']);

};
