'use strict';

import _ from 'lodash';
import gulp  from 'gulp';
import plumber from 'gulp-plumber';
import util from 'gulp-util';
import sourcemaps from 'gulp-sourcemaps';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';

let jsCompilation = function (opts) {
  let requiredTasks = [];
  opts.dest = opts.dest ? opts.dest : (opts.dist ? global.paths.dist + 'js' : global.paths.tmp + 'js');
  opts.source = opts.source ? opts.source : (opts.dist ? global.paths.distjs : global.paths.devjs);

  if (opts.dist || opts.lint) {
    requiredTasks.push('lintjs');
  }

  _.defaults(opts, {
    dist: false,
    sourcemap: true,
    browserify: {
      debug: true
    }
  });

  // Build JS for distribution.- correction
  gulp.task(opts.taskName, requiredTasks, ()=> {
    return browserify(opts.source, opts.browserify)
      //.add(require.resolve('babelify/polyfill'))
      .transform(babelify)
      .bundle().on('error', util.log.bind(util, 'Browserify Error'))
      .pipe(plumber())
      .pipe(source(global.comp.js))
      .pipe(buffer())
      .pipe(gulpif(opts.dist, rename({suffix: '.min'})))
      .pipe(gulpif(opts.sourcemap, sourcemaps.init({loadMaps: true}))) // loads map from browserify file
      .pipe(gulpif(opts.dist, uglify({mangle: false})))
      .pipe(gulpif(opts.sourcemap, sourcemaps.write('./'))) // writes .map file
      .pipe(gulp.dest(opts.dest));
  });
};

export default jsCompilation;
