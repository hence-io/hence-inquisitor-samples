import gulp from 'gulp';
import {execSync} from 'child_process';

gulp.task('install-deps', ['install-gems'], function (done) {
  //execSync('npm i -g karma-cli', {stdio: 'inherit'});
  //execSync('npm i', {stdio: 'inherit'});
  execSync('bower i', {stdio: 'inherit'});

  done();
});

gulp.task('install-gems', function (done) {
  let isWin = /^win/.test(process.platform);
  let sudo = isWin ? '' : 'sudo ';

  execSync(`${sudo} gem update && ${sudo} gem install compass susy modular-scale breakpoint scss_lint font-awesome-sass`, {stdio: 'inherit'});

  done();
});
