const gulp = require('gulp');
const spawn = require('child_process').spawn

gulp.task('start', () => {
  const child = spawn('./node_modules/.bin/electron', ['app/src/main.js'])
})


