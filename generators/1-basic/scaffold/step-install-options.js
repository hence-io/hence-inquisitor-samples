// Essential Supporting Libraries/Utils
var _ = require('lodash'); // The epic JS multi-tool!
var path = require('path'); // For safe path joining
var inquisitor = require('hence-inquisitor'); // The star of the show!
var S = require('string'); // A valuable tool in string manipulation

// For options to assist prompt lists, or enums to aid building this step
var options = {
  scaffoldType: {
    a: 'Type A',
    b: 'Type B'
  }
};

// Specific all of this steps default options, so that should any questions be skiped or this step bypassed, these
// values will persist as the steps configuration.
var defaults = {
  scaffoldName: '',
  scaffoldType: options.scaffoldType.a,
  // By specifying a default as a boolean, because prompts take in words for yes/no, y/n, etc, ScaffoldStep will
  // check and convert these answers for you before the process function starts. Once less thing you need to worry about!
  confirm: true,
  // If you add defaults that aren't tied to prompts, they're still accessible and could be used to help other
  // steps, similar to use of defaults on the scaffold itself, carrying answers to later steps.
  hiddenOption: "I'm not used on a prompt, ha!"
};

// Start building your step and prompts to be used by the scaffold installer.
var step = inquisitor.ScaffoldStep({
  // Including the steps options and defaults allows them for use from within this step, as well as elsewhere as a module.
  options: options,
  defaults: defaults,
  // Build out your prompts to receive answers to process. These prompts are directly injected during the steps
  // processing to inquirer for you, so you simply need to list them. The scaffold will initialize and trigger then
  // when this step has been reached.
  prompts: [
    {
      name: 'scaffoldName',
      message: 'What is the name of your new scaffolding installer?',
      // inquisitor also provide helpers to normal inquirer actions, like vastly simplifying validation checks.
      // Another library, validate.js is leverage and leveraged for validatePrompt calls, letting you specify the
      // check you with to make against the value the user is inputting, and an error message should it be invalid.
      // Improvements are still being worked to make the check type flexible to compound multiple checks at once.
      validate: inquisitor.inquirer.validatePrompt('isNull', 'You must enter a value.', true)
    },
    {
      name: 'scaffoldType',
      message: "Select your scaffold type:",
      type: 'list',
      // Because we have a object listing these values for us, we can easily pull it's internal values with lodash
      choices: _.values(options.scaffoldType),
      "default": defaults.scaffoldType
    }, {
      name: 'confirm',
      message: 'All done! Create your generator now?',
      type: 'confirm',
      "default": defaults.confirm
    }
  ],
  // Once inquirer has finished processing all of your prompts, the resulting answers will be sent here, with a
  // callback allowing you to resume the installation on to the next step/final install. This is to allow you to
  // control when the step is finished processing should you require async control.
  process: function (answers, next) {
    // Confirm was automatically turned into a boolean for us. If the user said no, we want to abort the install process!
    if (!answers.confirm) {
      // Flagging this will completely halt the installer and provide a notice that the user has manually aborted.
      answers.aborted = true;
      return next(); // End the process here for now
    }

    // Lets add some files to the template file array for us to target when we get to the install. Paths can easily
    // be added or negated based on different answers provided by the user.
    answers.files.push(answers.dirs.template.root + '**');

    // Specify the targeted destination path for this template to send files too, and make sure it's system
    // friendly. Stringjs is a boon for essential string manipulation such as slugifying a path name.
    answers.dirs.dest = path.join(answers.dirs.dest, S(answers.scaffoldName).slugify().s);

    // Since we provided a list prompt type, only one answers is selectable form it. Lets decide what to do with the result.
    if (answers.scaffoldType === options.scaffoldType.a) {
      // Do something for this option
    } else {
      // Do something else if it's not selected
    }

    // Don't forget to allow the install process to continue onto the next step once you're done handling the options.
    next();
  }
});

module.exports = step;
