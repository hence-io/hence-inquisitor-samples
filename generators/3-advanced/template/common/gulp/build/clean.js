'use strict';

import gulp  from 'gulp';
import del from 'del';

// Empty the build dir.
gulp.task('clean', (done)=> {
  del([global.paths.dist + '*'], done);
});
