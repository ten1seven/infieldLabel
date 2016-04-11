var autoprefixer         = require('autoprefixer');
var banner               = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');
var autoprefixerBrowsers = ['last 3 versions', '> 1%', 'ie >= 9']
var browserSync          = require('browser-sync').create();
var del                  = require('del');
var extname              = require('gulp-extname');
var gulp                 = require('gulp');
var header               = require('gulp-header');
var include              = require('gulp-include');
var jshint               = require('gulp-jshint');
var notify               = require('gulp-notify');
var pkg                  = require('./package.json');
var plumber              = require('gulp-plumber');
var postcss              = require('gulp-postcss');
var precss               = require('precss');
var rename               = require('gulp-rename');
var runSequence          = require('run-sequence');
var stylish              = require('jshint-stylish');
var uglify               = require('gulp-uglify');


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
  Styles tasks
  --------------------
*/

gulp.task('styles:infieldLabel', function () {
  var processors = [
    precss,
    autoprefixer({
      browsers: autoprefixerBrowsers
    }),
  ];

  return gulp.src([
      './src/styles/jquery.infieldLabel.scss'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(postcss(processors))
    .pipe(extname())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
});

gulp.task('styles:other', function () {
  var processors = [
    precss,
    autoprefixer({
      browsers: autoprefixerBrowsers
    }),
  ];

  return gulp.src([
      './src/styles/index.scss'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(include())
    .pipe(postcss(processors))
    .pipe(extname())
    .pipe(gulp.dest('./assets/styles'))
    .pipe(browserSync.stream());
});

gulp.task('styles', function() {
  runSequence(
    'styles:infieldLabel',
    'styles:other'
  );
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
