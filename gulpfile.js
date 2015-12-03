const gulp = require('gulp');
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const eslint = require('gulp-eslint')
const del = require('del')
const argv = require('minimist')(process.argv.slice(2))

gulp.task('build', [
  'lint',
  'build-src',
  'build-lib',
  'build-templates',
  'build-config',
  'build-layout'
])

gulp.task('clean', () =>
  del(['build', 'dist']))

gulp.task('lint', () =>
  gulp.src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()))

// ----- Build tasks -----

gulp.task('build-src', () =>
  gulp.src('src/*')
    .pipe(babel())
    .pipe(gulp.dest('build')))

gulp.task('build-lib', () =>
  gulp.src('lib/*')
    .pipe(gulp.dest('build')))

gulp.task('build-templates', () =>
  gulp.src('templates/*')
    .pipe(gulp.dest('build')))

gulp.task('build-config', () =>
  gulp.src(argv.config)
    .pipe(rename('config.yaml'))
    .pipe(gulp.dest('build')))

gulp.task('build-layout', () =>
  gulp.src(argv.layout)
    .pipe(rename('layout.svg'))
    .pipe(gulp.dest('build')))
