'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

// run jsdoc task
gulp.task('jsdoc', function() {
  gulp.src('').pipe(shell(['"./node_modules/.bin/jsdoc" ./lib -r -t ./node_modules/ink-docstrap/template -c ./jsdoc.conf.json -d ./docs/jsdoc']));
});

// watch for any changes in the lib directory and re-run  jsdoc tasks to make the documentation
gulp.task('watch', function() {
  gulp.watch('./lib/**/*.js', ['jsdoc']);
});

gulp.task('default', ['jsdoc', 'watch']);