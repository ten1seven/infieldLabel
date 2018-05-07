const banner = [
  '/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''
].join('\n')
const autoprefixer = require('autoprefixer')
const browserSync = require('browser-sync').create()
const del = require('del')
const gulp = require('gulp')
const header = require('gulp-header')
const notify = require('gulp-notify')
const pkg = require('./package.json')
const plumber = require('gulp-plumber')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const runSequence = require('run-sequence')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')

/*
  --------------------
  Clean tasks
  --------------------
*/

gulp.task('clean', () => {
  return del(['**/.DS_Store', './assets/*'])
})

/*
  --------------------
  Scripts task
  --------------------
*/

gulp.task('scripts', () => {
  return gulp.src(['./jquery.infieldLabel.js'])
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(uglify())
    .pipe(rename('jquery.infieldLabel.min.js'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('./'))
    .pipe(notify('Scripts uglify task complete'))
})

/*
  --------------------
  Styles tasks
  --------------------
*/

let processors = [
  autoprefixer({
    browsers: ['last 3 versions', '> 1%', 'ie >= 10']
  })
]

gulp.task('styles:infieldLabel', () => {
  return gulp.src([
      './src/styles/jquery.infieldLabel.scss'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
})

gulp.task('styles:other', () => {
  return gulp.src([
      './src/styles/index.scss'
    ])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('./assets/styles'))
    .pipe(browserSync.stream())
})

gulp.task('styles', () => {
  runSequence(
    'styles:infieldLabel',
    'styles:other'
  )
})

/*
  --------------------
  Default task
  --------------------
*/

gulp.task('default', () => {
  runSequence('clean', ['scripts', 'styles'], () => {
    browserSync.init({
      server: {
        baseDir: './'
      }
    })

    gulp.watch(['./src/styles/{,*/}{,*/}*.scss'], ['styles'])

    gulp.watch([
      './jquery.infieldLabel.js'
    ], ['scripts']).on('change', browserSync.reload)
  })
})
