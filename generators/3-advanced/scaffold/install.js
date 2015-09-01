// Plugins
var _ = require('lodash');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');

var install = function (answers, finished) {
  var destDir = answers.dirs.dest;

  if (this.debug) {
    console.log('>> Attempting install with:', _.omit(answers, 'dependencies', 'files', 'npmDevDependencies', 'npmDependencies', 'bowerDependencies'));
  }

  // Due to the nature of font files, or any other future files that must not be parsed by the template
  // controls, they have to handled separately
  var fontDir = destDir + 'fonts';
  gulp.src(answers.dirs.fonts + '**')
    .pipe(conflict(fontDir))
    .pipe(gulp.dest(fontDir));

  // Start building the pipe for installing the package
  var stream = gulp.src(answers.files)
    .pipe(template(_.omit(answers, 'files'), {
      interpolate: /<%=(.+?)%>/g
    }))
    .pipe(rename(function (filepath) {
      var dirname = filepath.dirname;
      var basename = filepath.basename;

      if (dirname[0] === '_') {
        filepath.dirname = '.' + dirname.slice(1);
      }

      if (basename[0] === '_') {
        filepath.basename = '.' + basename.slice(1);
      } else if (basename.indexOf('hence-el') !== -1) {
        filepath.basename = basename.replace('hence-el', answers.compName);
      }
    }))
    .pipe(conflict(destDir, {defaultChoice: 'n'}))
    .pipe(gulp.dest(destDir));

  return finished(null, stream);
};

module.exports = install;
