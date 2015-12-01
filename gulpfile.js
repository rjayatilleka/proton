const gulp = require('gulp');
const rename = require('gulp-rename')
// const babel = require('gulp-babel')
const del = require('del')
const spawn = require('child_process').spawn
const argv = require('minimist')(process.argv.slice(2))

gulp.task('build-src', ['clean'], () =>
  gulp.src('src/*')
    .pipe(gulp.dest('build')))

gulp.task('build-lib', ['clean'], () =>
  gulp.src('lib/*')
    .pipe(gulp.dest('build')))

gulp.task('build-config', ['clean'], () =>
  gulp.src(argv.config)
    .pipe(rename('config.yaml'))
    .pipe(gulp.dest('build')))

gulp.task('build-layout', ['clean'], () =>
  gulp.src(argv.layout)
    .pipe(rename('layout.svg'))
    .pipe(gulp.dest('build')))

gulp.task('default', ['build-src', 'build-lib', 'build-config', 'build-layout'])

gulp.task('clean', () =>
  del(['build', 'dist']))
