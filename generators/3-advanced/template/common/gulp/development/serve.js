'use strict';

import gulp from 'gulp';
import path from 'path';
import util from 'gulp-util';
import htmlInjector from "bs-html-injector";

// browserSync
import browserSyncConstructor from 'browser-sync';
let browserSync = browserSyncConstructor.create();

import sassCompilation from './../sass';
sassCompilation({taskName: 'sass', browserSync: browserSync, lint: true});

import jsCompilation from './../javascript';
jsCompilation({taskName: 'js', lint: true});

import htmlCompilation from './../html';
htmlCompilation({taskName: 'html'});

/**
 * browserSync Tasks
 */
gulp.task('serve', ['clean-tmp', 'js', 'sass', 'html'], function () {
  browserSync.use(htmlInjector, {
    files: global.paths.html
  });
  browserSync.init({
    server: {
      baseDir: ['./']
    },
    startPath: '/.tmp/index.html'
  });

  gulp.watch([global.paths.js], ['js-watch']).on('change', logChanges);
  gulp.watch([global.paths.sass], ['sass-watch']).on('change', logChanges);
  gulp.watch([global.paths.html], ['html-watch']).on('change', logChanges);
});

gulp.task('sass-watch', ['sass']);
gulp.task('js-watch', ['lintjs', 'js'], function () {
  return browserSync.reload();
});
gulp.task('html-watch', ['html'], htmlInjector);

/**
 * browserSync logging
 * @param event
 */
function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
    util.colors.magenta(path.basename(event.path))
  );
}
