import gulp from 'gulp';
import requireDir from 'require-dir';

// Require all tasks in the 'gulp' folder.
requireDir('./gulp', {recurse: false});
requireDir('./gulp/build', {recurse: false});
requireDir('./gulp/development', {recurse: false});

// Default task; start local server & watch for changes.
gulp.task('default', ['serve']);
