'use strict';

import gulp from 'gulp';
import plumber from 'gulp-plumber';
import cache from 'gulp-cached';
import eslint from 'gulp-eslint';
import scsslint from 'gulp-scss-lint';

// Lint JS.
gulp.task('lintjs', ()=> {
  return gulp.src(global.paths.js)
    .pipe(plumber())
    .pipe(cache('lintjs'))
    .pipe(eslint())
    .pipe(eslint.format());
});

// Lint SASS.
gulp.task('lintsass', ()=> {
  return gulp.src(global.paths.sass)
    .pipe(plumber())
    .pipe(cache('lintsass'))
    .pipe(scsslint());
});

// Lint all the things!
gulp.task('lint', ['lintjs', 'lintsass']);
