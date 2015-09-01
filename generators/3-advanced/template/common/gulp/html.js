'use strict';

import gulp  from 'gulp';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
// Html
import minifyHtml from 'gulp-minify-html';

let htmlCompile = function (opts) {
  let {taskName, dist} = opts;
  let dest = dist ? global.paths.dist : global.paths.tmp;

  // Build HTML for distribution.
  gulp.task(taskName, ()=> {
    gulp.src(global.paths.src + global.comp.html)
      .pipe(plumber())
      .pipe(replace('</dom-module>',
        `<link rel="import" type="css" href="css/${global.comp.name}.css\">
        <script src="js/${global.comp.name}.js\"></script>
        </dom-module>`))
      .pipe(gulpif(dist, replace('/bower_components', '../..')))
      .pipe(gulpif(dist, replace(global.comp.name + '.js', global.comp.name + '.min.js')))
      .pipe(gulpif(dist, replace(global.comp.name + '.css', global.comp.name + '.min.css')))
      .pipe(gulp.dest(dest));

    gulp.src([global.paths.src + 'index.html'])
      .pipe(plumber())
      .pipe(gulpif(dist, replace('webcomponents-lite.js', 'webcomponents-lite.min.js')))
      .pipe(gulpif(dist, replace('/bower_components', '../..')))
      .pipe(gulpif(dist, minifyHtml()))
      .pipe(gulp.dest(dest));
  });
};

export default htmlCompile;
