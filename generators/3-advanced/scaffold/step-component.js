var _ = require('lodash');
var S = require('string');
var inquisitor = require('hence-inquisitor');

var options = {
  compTypes: {
    schema: 'schema',
    model: 'model',
    ui: 'ui'
  }
};

var defaults = {
  compPrefix: 'hence',
  compName: 'demo',
  compType: options.compTypes.ui,
  compDescription: '',
  compVersion: '0.1.0'
};

var step = inquisitor.ScaffoldStep({
  options: options,
  defaults: defaults,
  content: {
    header: {
      title: "Component Definition",
      details: "The following questions will help you to identify, define and describe your component. Your component will\n" +
      " be named using the convention " + inquisitor.colors.dim("[namespace]-[name]") + "."
    }
  },
  prompts: [
    {
      name: 'compPrefix',
      message: '[namespace] What is your component namespace or project name? ',
      "default": defaults.compPrefix,
      validate: inquisitor.inquirer.validatePrompt('isNull', 'You must enter a value.', true)
    },
    {
      name: 'compName',
      message: '[name] What do you want to name your new component?',
      "default": defaults.compName,
      validate: inquisitor.inquirer.validatePrompt('isNull', 'You must enter a value.', true)
    }, {
      type: 'list',
      name: 'compType',
      message: "Select your new component's type from below. " +
      inquisitor.colors.reset.dim('\n  See project documentation to for more information on Hence component types.\n'),
      choices: _.keys(options.compTypes),
      "default": defaults.compType
    }, {
      name: 'compDescription',
      message: 'Describe your new component:',
      "default": defaults.compDescription,
      when: function () {
        return this.inquirer.detailedInstallOnly();
      }
    }, {
      name: 'compVersion',
      message: 'Starting version of your project?',
      "default": defaults.compVersion,
      when: function () {
        return this.inquirer.detailedInstallOnly();
      }
    }
  ],
  process: function (answers, next) {
    // files
    var files = answers.files;
    // dependencies
    var npm = answers.dependencies.npm;
    var bower = answers.dependencies.bower;
    // dirs
    var templateDir = answers.dirs.template;

    // configure the components name
    answers.compName = S(answers.compPrefix + ' ' + answers.compName).slugify().s;
    answers.compClassName = S(answers.compName).camelize().s;
    answers.compClassName = answers.compClassName[0].toUpperCase() + answers.compClassName.slice(1); // Can't use .capitalize() as it will lowercase the camel humps

    // include the essential folders
    files.push(templateDir.common + '**');
    files.push(templateDir.type + answers.compType + '/**');

    // determine component type specific requirements/dependencies
    switch (answers.compType) {
      case options.compTypes.schema:
        _.extend(npm.devDependencies, {
          "schemas": "^1.0.0"
        });
        break;
      case options.compTypes.model:
        _.extend(bower.dependencies, {});
        break;
      case options.compTypes.ui:
        _.extend(bower.dependencies, {});
        break;
    }

    next();
  }
});

module.exports = step;
