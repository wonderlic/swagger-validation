'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

// run docker task
// WHY YOU NO WORK?!?!
gulp.task('docker', function() {
  shell.task([
    //'node docker -i "C:\\Source-Code\\swagger-validation\\lib" -o "C:\\Source-Code\\swagger-validation\\docs" -c monokai -n'
    'docker -i ./lib -o ./docs -c monokai'
  ]);
});

//gulp.task('watch', function() {
//  gulp.watch('./lib/validation/*.js', function() {
//    gulp.run('docco');
//  });
//});

gulp.task('default', ['docker']);