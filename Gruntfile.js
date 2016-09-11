module.exports = function(grunt) {
  grunt.registerTask('watch', [ 'watch' ]);
  grunt.registerTask('default', [
    'concat:scripts',
    'less'
  ]);
  grunt.registerTask('serve', [
    'concat:scripts',
    'less',
    'watch'
  ]);

  grunt.initConfig({
    concat: {
      scripts: {
        options: {
          separator: ''
        },
        src: [
          'public/js/components/*.js',
          'public/js/app.js',
        ],
        dest: 'public/js/scripts.js'
      },
    },
    less: {
      style: {
        files: {
          "public/css/styles.css": "public/css/styles.less"
        }
      }
    },
    watch: {
      js: {
        files: ['public/js/app.js', 'public/js/components/*.js'],
        tasks: ['concat:scripts'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['public/css/*.less', 'public/css/components/*.less'],
        tasks: ['less:style'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
};
