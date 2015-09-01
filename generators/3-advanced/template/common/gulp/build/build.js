'use strict';

// Common
import gulp from 'gulp';
import plumber from 'gulp-plumber';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import runSeq from 'run-sequence';
import sourcemaps from 'gulp-sourcemaps';
import util from 'gulp-util';

// Images
import pngquant from 'imagemin-pngquant';
import imagemin from 'gulp-imagemin';

// JS
import uglify from 'gulp-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';

// Serve
import browserSyncConstructor from 'browser-sync';
let browserSync = browserSyncConstructor.create();

import sassCompilation from './../sass';
sassCompilation({taskName: 'buildsass', browserSync: browserSync, dist: true});

import jsCompilation from './../javascript';
jsCompilation({taskName: 'buildjs', dist: true});

import htmlCompilation from './../html';
htmlCompilation({taskName: 'buildhtml', dist: true});

// One build task to rule them all.
gulp.task('build', (done)=> {
  runSeq('clean', ['buildsass', 'buildimg', 'buildjs'], 'buildhtml', done);
});

gulp.task('build:serve', (done)=> {
  runSeq('clean', ['build'], 'buildhtml', function () {
    browserSync.init({
      server: {
        baseDir: ['./']
      },
      startPath: '/dist/index.html'
    });
  });
});

// Build images for distribution.
gulp.task('buildimg', ()=> {
  gulp.src(global.paths.img)
    .pipe(plumber())
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(global.paths.dist + 'img'));
});
