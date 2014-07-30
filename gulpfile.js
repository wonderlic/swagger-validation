'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

// run docker task
gulp.task('docker', function() {
  gulp.src('').pipe(shell(['"./node_modules/.bin/docker" -i ./lib -o ./docs/docker -c native -n']));
});

// run jsdoc task
gulp.task('jsdoc', function() {
  gulp.src('').pipe(shell(['"./node_modules/.bin/jsdoc" ./lib -r -t ./node_modules/ink-docstrap/template -c ./jsdoc.conf.json -d ./docs/jsdoc']));
});

// watch for any changes in the lib directory and re-run docker and jsdoc tasks to make the documentation
gulp.task('watch', function() {
  gulp.watch('./lib/**/*.js', ['jsdoc', 'docker']);
});

gulp.task('default', ['docker', 'jsdoc', 'watch']);