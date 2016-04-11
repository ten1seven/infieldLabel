var banner          = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');
var browserSync     = require('browser-sync').create();
var del             = require('del');
var gulp            = require('gulp');
var header          = require('gulp-header');
var jshint          = require('gulp-jshint');
var notify          = require('gulp-notify');
var pkg             = require('./package.json');
var plumber         = require('gulp-plumber');
var rename          = require('gulp-rename');
var runSequence     = require('run-sequence');
var stylish         = require('jshint-stylish');
var uglify          = require('gulp-uglify');


/*
  --------------------
  Clean tasks
  --------------------
*/

gulp.task('clean', function () {
  return del(['**/.DS_Store']);
});


/*
  --------------------
  Scripts task
  --------------------
*/

gulp.task('scripts', function() {
  return gulp.src(['./jquery.infieldLabel.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(uglify())
    .pipe(rename('jquery.infieldLabel.min.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./'))
    .pipe(notify('Scripts uglify task complete'));
});


/*
  --------------------
  Default task
  --------------------
*/

gulp.task('default', function() {
  runSequence('clean', ['scripts'], function() {
    browserSync.init({
      server: {
        baseDir: './'
      }
    });

    gulp.watch([
      './jquery.infieldLabel.js'
    ], ['scripts']).on('change', browserSync.reload);
  });
});
