module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n' +
            '  Learning FED Bookmarks site v<%= pkg.version %>\n' +
            '  <%= pkg.license %> License\n' +
            '  Created by <%= pkg.author %> using Bootstrap 3.1\n' +
            '*/\n\n',

    less: {
      production: {
        files: {
          "assets/css/app.min.css": "_less/app.less"
        },
        options: {
          compress: true,
          banner: '<%= banner %>'
        }
      }
    },

    uglify: {
      jquery: {
        files: {
          'assets/js/jquery.min.js': 'app/bower_components/jquery/jquery.js'
        }
      },
      respond: {
        files: {
          'assets/js/respond.min.js': 'app/bower_components/respond/src/respond.js'
        }
      },
      bootstrap: {
        files: {
          'assets/js/bootstrap.min.js': ['app/bower_components/bootstrap/js/collapse.js', 'app/bower_components/bootstrap/js/button.js', 'app/bower_components/bootstrap/js/dropdown.js']
        }
      },
      app: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'assets/js/app.min.js': 'assets/js/app.js'
        }
      }
    },

    copy: {
      bootstrap: {
        files: [
          {expand: true, cwd: 'app/bower_components/bootstrap/dist/fonts/', src: ['**'], dest: 'assets/fonts/'},
        ]
      }
    },

    exec: {
      rvm: {
        cmd: 'rvm use ruby 2.0'
      },
      build: {
        cmd: 'jekyll build'
      },
      serve: {
        cmd: 'jekyll serve -w'
      }
    }
  });
  grunt.loadNpmTasks('grunt-exec');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'less', 'copy']);
  grunt.registerTask('serve', [ 'less', 'exec:serve' ]);
};