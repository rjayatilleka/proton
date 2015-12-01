const gulp = require('gulp');
const rename = require('gulp-rename')
const del = require('del')
const spawn = require('child_process').spawn
const mergeStream = require('merge-stream')

const launchApp = () =>
  spawn('./node_modules/.bin/electron', ['build/main.js'])

const build = (configName, layoutName) => {
  const configStream = gulp.src('config/' + configName)
    .pipe(rename('config.yaml'))

  const layoutStream = gulp.src('images/' + layoutName)
    .pipe(rename('layout.svg'))

  const srcStream = gulp.src('src/**/*')

  const merged = mergeStream(configStream, layoutStream, srcStream)

  return merged.pipe(gulp.dest('build'))
}

gulp.task('default', ['build-dev'], () =>
  launchApp())

gulp.task('build-dev', ['clean'], () =>
  build('dev.yaml', 'example1.svg'))

gulp.task('clean', () =>
  del(['build', 'dist']))
