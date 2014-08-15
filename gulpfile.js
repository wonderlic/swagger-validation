'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var jsdoc2md = require("gulp-jsdoc-to-markdown");
var gutil = require("gulp-util");
var concat = require("gulp-concat");

// run jsdoc task
gulp.task('jsdoc', function() {
  gulp.src('').pipe(shell(['"./node_modules/.bin/jsdoc" ./lib -r -t ./node_modules/ink-docstrap/template -c ./jsdoc.conf.json -d ./docs/html']));
});

// run jsdoc to markdown task
gulp.task("jsdoc_markdown", function() {
  return gulp.src("lib/**/*.js")
    .pipe(concat("DOCUMENTATION.md"))
    .pipe(jsdoc2md())
    .on("error", function(err) {
      gutil.log("jsdoc2md failed:", err.message);
    })
    .pipe(gulp.dest("docs/md"));
});

// watch for any changes in the lib directory and re-run  jsdoc tasks to make the documentation
gulp.task('watch', function() {
  gulp.watch('./lib/**/*.js', ['jsdoc', 'jsdoc_markdown']);
});

gulp.task('default', ['jsdoc', 'jsdoc_markdown', 'watch']);