'use strict';

import gulp  from 'gulp';
import util from 'gulp-util';

gulp.task('help', ()=> {
  var defaultColor = util.colors.green;
  util.log(util.colors.bold.underline.magenta('Hench Component Gulp Commands'));
  util.log(defaultColor('$ gulp                  -- Will compile assets, serve your web component with live reload, transpile es6, and lint your js/scss all while watching your src files'));
  util.log(defaultColor('$ gulp build            -- Will compile your component for consumption, exporting it to a /dist folder'));
  util.log(defaultColor('$ gulp kss:build        -- Will generate your components style guide into the /dist folder'));
  util.log(defaultColor('$ gulp kss              -- Will generate your components style guide and render it for you to review'));
  util.log(defaultColor('$ gulp test             -- Will execute the wct test tool to perform selenium behavioural tests on your web component'));
  util.log(defaultColor('$ gulp karma            -- Will execute es6 unit testing on your web component\'s script files'));
  util.log(defaultColor('$ gulp karma:watch      -- Will execute the karma tests and set a watcher on the component and test script files'));
});
