const gulp = require('gulp');
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const del = require('del')
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
  gulp.src('src/**/*.js'))

// ----- Build tasks -----

// gulp.task('build-src', ['lint'], () =>
gulp.task('build-src', () =>
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
