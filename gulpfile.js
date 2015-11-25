const gulp = require('gulp');
const rename = require('gulp-rename')
const del = require('del')
const spawn = require('child_process').spawn

const launchApp = () =>
  spawn('./node_modules/.bin/electron', ['src/main.js'])

const generate = (configPath, layoutPath) => {
  gulp.src(configPath)
    .pipe(rename('config.yaml'))
    .pipe(gulp.dest('generated'))

  gulp.src(layoutPath)
    .pipe(rename('layout.svg'))
    .pipe(gulp.dest('generated'))
}

gulp.task('default', ['build-dev'], () =>
  launchApp())

gulp.task('build-dev', ['clean'], () =>
  generate('config/dev.yaml', 'images/example1.svg'))

gulp.task('clean', () =>
  del(['generated', 'dist']))
