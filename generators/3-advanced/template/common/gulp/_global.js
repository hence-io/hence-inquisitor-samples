var srcDir = './src/';
var tmpDir = './.tmp/';
var buildSrcDir = './gulp/src/';

var name = '<%= compName %>';
global.comp = {
  name: name,
  js: name + '.js',
  scss: name + '.scss',
  css: name + '.css',
  html: name + '.html',
  camel: '<%= compClassName %>'
};

// Specify paths & globbing patterns for tasks.
global.paths = {
  // HTML sources.
  'html': srcDir + '**/*.html',
  // Bower
  'bower': './bower_components/',
  // Build Src Dir
  buildSrcDir: buildSrcDir,
  // Dist JS file
  'distjs': buildSrcDir + 'dist.js',
  // Dev JS file
  'devjs': srcDir + 'index.js',
  // JS sources.
  'gulp': srcDir + 'gulp/**/*.js',
  // JS sources.
  'js': srcDir + '**/*.js',
  // SASS sources.
  'sass': srcDir + '**/*.scss',
  // Fonts
  'fonts': './fonts/**',
  // Image sources.
  'img': srcDir + 'img/*',
  // Sources folder.
  'src': srcDir,
  // Compiled CSS folder.
  'css': srcDir + 'css',
  // Distribution folder.
  'dist': './dist/',
  // Temp folder.
  'tmp': tmpDir,
  // Output css filepath
  tmpCssOutput: `${tmpDir}css/`,
  tmpCssOutputFile: `${tmpDir}css/${global.comp.name}.css`,
  // WCT Test folder
  'testBehaviour': './test/behaviour/**/*',
  // Unit Test folder
  'testUnit': './test/unit/**/*'
};
