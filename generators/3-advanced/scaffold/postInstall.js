// Plugins
var _ = require('lodash');
var git = require('gulp-git');
var execSync = require('child_process').execSync;

// hence-inquisitors
var inquisitor = require('hence-inquisitor');

var postInstall = function (answers, finalize) {
  var destDir = answers.dirs.dest;

  if (answers.gitInit) {
    console.log('>> Initializing Git Repository:', destDir);
    git.init({cwd: destDir}, function (err) {
      if (err) {
        return finalize(['error', 'postInstall', 'git init failure', err]);
      }
    });
  }

  if (answers.installDependencies) {
    try {
      console.log(inquisitor.ascii.heading('Installing Dependencies') + ' On:', answers.dirs.dest);
      execSync('npm run install-deps', {cwd: answers.dirs.dest, stdio: 'inherit'});
    } catch (err) {
      return finalize(['error', 'postInstall', 'installDependencies failure', err]);
    }
  } else if (this.content.done != inquisitor.ascii.spacer()) {
    this.content.done += "\n\n " + inquisitor.colors.bold('Note:') + " You chose " + inquisitor.colors.bold('not') +
      " to install this packages  dependencies at this time. Please ensure to do this before attempting\n to" +
      " utilize it by running '" + inquisitor.colors.bold('npm run install-deps') + "'."
  }

  return finalize();
};

module.exports = postInstall;
