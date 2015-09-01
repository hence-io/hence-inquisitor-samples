'use strict';

import gulp  from 'gulp';
import del from 'del';

// Empty the tpm dev dir.
gulp.task('clean-tmp', (done)=> {
  del([global.paths.tmp + '*'], done);
});
