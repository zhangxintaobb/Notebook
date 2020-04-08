/* global module: true */
module.exports = function (grunt) {
  grunt.initConfig({
    htmlhint: {
      options: {
        htmlhintrc: '.htmlhintrc'
      },
      src: ['*.html', './com/**/*.html']
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc'
      },
      src: ['css/*.css', './com/**/*.css']
    },
    eslint: {
      options: {
        configFile: '.eslintrc.json'
      },
      target: ['./js/*.js', './com/**/*.js']
    },
    htmlmin: {
      options: {
        collapseWhitespace: true,
        preserveLineBreaks: false
      },
      files: {
        src: 'dist/index.html',
        dest: 'dist/index.html'
      }
    },
    imagemin: {
      /* 压缩图片大小 */
      dist: {
          options: {
              optimizationLevel: 1 //定义 PNG 图片优化水平
          },
          files: [{
              expand: true,
              cwd: './images', //原图存放的文件夹
              src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
              dest: 'dist/img/' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
          }]
      }
  },
    copy: {
      html: {
        src: './index.html',
        dest: './dist/index.html'
      },
      image: {
        src: "./img",
        dest: "./dist/img"
    }
    },
    concat: {
      js: {
        src: ['js/*.js'],
        dest: 'dist/bundle.js'
      },
      css: {
        src: ['css/*.css'],
        dest: 'dist/bundle.css'
      }
    },
    uglify: {
      'dist/bundle.min.js': 'dist/bundle.js'
    },
    cssmin: {
      'dist/bundle.min.css': 'dist/bundle.css'
    },
    useminPrepare: {
      html: 'index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/index.html']
    },
    clean: {
      end: ['dist/bundle.css', 'dist/bundle.js', '.tmp']
    }
  });

  grunt.loadNpmTasks('grunt-htmlhint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-eslint');

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');

  grunt.registerTask('release', ['copy:html', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'usemin', 'htmlmin', 'clean:end']);
};
