const gulp = require('gulp');
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const jshint = require('gulp-jshint')
const del = require('del')
const spawn = require('child_process').spawn
const argv = require('minimist')(process.argv.slice(2))

gulp.task('build', [
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
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail')))

// ----- Build tasks -----

gulp.task('build-src', ['lint'], () =>
  gulp.src('src/*')
    .pipe(babel({
      plugins: ['transform-flow-strip-types']
    }))
    .pipe(babel({
      presets: ['es2015-node5']
    }))
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
