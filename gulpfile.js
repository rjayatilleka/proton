const gulp = require('gulp');
const packager = require('electron-packager')
const exec = require('child_process').exec;

gulp.task('run', (cb) => {
  exec('$(npm bin)/electron app/src/main.js', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
    cb();
  });
})
