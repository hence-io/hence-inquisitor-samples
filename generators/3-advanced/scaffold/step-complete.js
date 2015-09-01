var _ = require('lodash');
var inquisitor = require('hence-inquisitor');

var options = {};

var defaults = {
  beginInstall: true
};

var step = inquisitor.ScaffoldStep({
  options: options,
  defaults: defaults,
  content: {
    header: {
      title: 'Installation Ready',
      details: inquisitor.colors.bold("You've finished providing all of your installation details. ") +
      " We're ready to configure and install your package."
    }
  },
  prompts: [
    {
      type: 'confirm',
      name: 'beginInstall',
      message: 'Everything is set, proceed to install your package now?'
    }
  ],
  process: function (answers, next) {
    var npm = answers.dependencies.npm;
    var bower = answers.dependencies.bower;

    // Flag whether or not the user aborted the install process
    if (!answers.beginInstall) {
      answers.aborted = true;
    }

    // Provide easy access to these variables for the templating
    answers.npmDevDependencies = JSON.stringify(npm.devDependencies);
    answers.npmDependencies = JSON.stringify(npm.dependencies);
    answers.bowerDependencies = JSON.stringify(bower.dependencies);

    next();
  }
});

module.exports = step;
