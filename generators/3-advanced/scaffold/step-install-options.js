var _ = require('lodash');
var inquisitor = require('hence-inquisitor');

var options = {
  installOptions: {
    quick: 'Quick',
    detailed: 'Detailed'
  }
};

var defaults = {
  installOption: options.installOptions.quick
};

var step = inquisitor.ScaffoldStep({
  options: options,
  defaults: defaults,
  prompts: [
    {
      type: 'list',
      name: 'installOption',
      message: 'Preform a quick set up, or detailed?',
      choices: _.values(options.installOptions),
      "default": defaults.installOptions
    }
  ]
});

module.exports = step;
