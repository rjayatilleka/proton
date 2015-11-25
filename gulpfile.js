const gulp = require('gulp');
const packager = require('electron-packager')

gulp.task('default', (cb) => {
  const opts = {
    dir: '.',
    name: 'Visualizer',
    platform: 'darwin',
    arch: 'x64',
    version: '0.35.1',
    out: 'dist'
  }
  packager(opts, cb)
});