'use strict';

import _ from 'lodash';
import gulp from 'gulp';
import {exec,execSync} from 'child_process';
import {test as webComponentTester} from 'web-component-tester';
import util from 'gulp-util';

/***********************************************************************************************************************
 * Karma Unit Testing
 **********************************************************************************************************************/
gulp.task('karma', function () {
  exec('npm run test', (err, stdout)=> { console.log(stdout); });
});

gulp.task('karma:watch', function () {
  execSync('npm run test:watch', {stdio: 'inherit'});
});

/***********************************************************************************************************************
 * Web Component Testing
 **********************************************************************************************************************/
  // Re-purposed tasks from the web-component-test library; required to build the component in it's final form for wct testing
gulp.task('test', ['wct:local'], function (done) {
  done();
});

gulp.task('test:watch', ['wct:local'], function (done) {
  gulp.watch([global.paths.js, global.paths.sass, global.paths.html, global.paths.testBehaviour], ['wct:local']);
});

let wctIstanbul = {
  //"web-component-tester-istanbul": {
  //  dir: "./coverage",
  //  reporters: ["text-summary", "lcov"],
  //  include: [
  //    `**/dist/js/${global.comp.name}.min.js`,
  //    `**/test/behaviour/*.js`
  //  ],
  //  workingDir: `/components/${global.comp.name}/`
  //}
};

gulp.task('wct:local', ['build'], function (done) {
  webComponentTester({plugins: _.extend(wctIstanbul, {local: {}, sauce: false})}, cleanDone(done));
});

gulp.task('wct:sauce', ['build'], function (done) {
  webComponentTester({plugins: _.extend(wctIstanbul, {local: false, sauce: {}})}, cleanDone(done));
});

// Slightly modified from wct's usage, using gulp-util.colors vs chalk (.colors is chalk already), and reducing the
// error to the final count vs garble.
function cleanDone(done) {
  return function (error) {
    if (error) {
      // Pretty error for gulp.
      var result = JSON.stringify(error || '') || error;
      error = new Error(util.colors.red('Error:' + result.slice(result.lastIndexOf(',') + 1)));
      error.showStack = false;
    }
    done(error);
  };
}
