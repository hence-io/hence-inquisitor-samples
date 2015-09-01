// Plugins
var _ = require('lodash');

// hence-inquisitors
var inquisitor = require('hence-inquisitor');
var hence = require('hence-util');


var tplDir = __dirname + '/template/';

var steps = [
  require('./scaffold/step-install-options'),
  require('./scaffold/step-component'),
  require('./scaffold/step-author'),
  require('./scaffold/step-project'),
  require('./scaffold/step-complete')
];
var installOptions = steps[0].options.installOptions;

var scaffold = inquisitor.Scaffold({
  // The step order isn't locked down, it can be swapped out as long as higher steps don't require answers from lower
  // steps, you're aok!
  steps: steps,
  defaults: {
    dependencies: require('./dependencies.json'),
    dirs: {
      template: {
        common: tplDir + 'common/',
        type: tplDir + 'type/',
        fonts: tplDir + 'fonts/',
        optional: tplDir + 'optional/'
      },
      dest: './'
    },
    installDependencies: !inquisitor.env['ignore-deps'],
    gitInit: !!inquisitor.env.git,
    compPrefix: inquisitor.env.pre || 'hence'
  },
  content: {
    intro: hence.ascii.hence(
      inquisitor.colors.bold(" Welcome to the Hence.io Scaffolding Tool. ") + "Your component generation is about to be" +
      " being. You have to option to\n create a component with a quick install, or dive into a detailed installation" +
      " should you desire."
    ),
    done: inquisitor.colors.bold(" Thank you for using the Hence.io Scaffolding Tool!\n") +
    " Review the possible gulp commands available to you on the project documentation, or type '" +
    inquisitor.colors.bold('gulp help') + "' at any time."
  },
  inquirer: {
    detailedInstallOnly: function () {
      return scaffold.answers.installOption === installOptions.detailed;
    }
  },
  cliArg: function (arg) {
    var splitName = arg.split(':');

    return {
      content: {
        intro: inquisitor.ascii.heading('Component Installation') +
        inquisitor.colors.bold(' Name: ') + this.defaults.compPrefix + '-' + splitName[0] +
        inquisitor.colors.bold('\n Type: ') + splitName[1],
        done: inquisitor.ascii.spacer()
      },
      defaults: {
        compName: splitName[0],
        compType: splitName[1]
      }
    };
  },
  install: require('./scaffold/install'),
  postInstall: require('./scaffold/postInstall')
});

module.exports = scaffold;
