const gulp = require('gulp');
const rename = require('gulp-rename')
const del = require('del')
const spawn = require('child_process').spawn
const mergeStream = require('merge-stream')

const launchApp = () =>
  spawn('./node_modules/.bin/electron', ['build/main.js'])

const build = (configName, layoutName) => {
  const configStream = gulp.src('config/' + configName + '.yaml')
    .pipe(rename('config.yaml'))
    .pipe(gulp.dest('build'))

  const layoutStream = gulp.src('images/' + layoutName + '.svg')
    .pipe(rename('layout.svg'))
    .pipe(gulp.dest('build'))

  return mergeStream(configStream, layoutStream)
}

gulp.task('default', ['build-dev'], () =>
  launchApp())

gulp.task('build-dev', ['clean'], () =>
  generate('dev', 'example1'))

gulp.task('clean', () =>
  del(['generated', 'dist']))
