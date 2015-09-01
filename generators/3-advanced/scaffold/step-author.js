var _ = require('lodash');
var S = require('string');
var path = require('path');
var inquisitor = require('hence-inquisitor');

var options = {};

var defaults = (function () {
  var workingDirName = path.basename(process.cwd()),
      homeDir, osUserName, configFile, user;

  if (process.platform === 'win32') {
    homeDir = process.env.USERPROFILE;
    osUserName = process.env.USERNAME || path.basename(homeDir).toLowerCase();
  }
  else {
    homeDir = process.env.HOME || process.env.HOMEPATH;
    osUserName = homeDir && homeDir.split('/').pop() || 'root';
  }

  configFile = path.join(homeDir, '.gitconfig');
  user = {};

  if (require('fs').existsSync(configFile)) {
    var gitconfig = require('iniparser').parseSync(configFile);
    user = _.defaults(gitconfig.github, gitconfig.user);
  }

  return {
    githubUser: S(user.user || osUserName || user.name || '').slugify().s,
    authorName: user.name || '',
    authorEmail: user.email || ''
  };
})();

var step = inquisitor.ScaffoldStep({
  options: options,
  defaults: defaults,
  content: {
    header: {
      title: "Author Details",
      details: "Provide your details as the package's primary author."
    }
  },
  prompts: [
    {
      name: 'authorName',
      message: 'What is your name?',
      "default": defaults.authorName,
      when: function () {
        return this.inquirer.detailedInstallOnly();
      }
    }, {
      name: 'authorEmail',
      message: 'What is your email?',
      "default": defaults.authorEmail,
      when: function () {
        return this.inquirer.detailedInstallOnly();
      }
    }, {
      name: 'githubUser',
      message: 'What is your github username?',
      "default": defaults.githubUser,
      when: function () {
        return this.inquirer.detailedInstallOnly();
      }
    }
  ]
});

module.exports = step;
