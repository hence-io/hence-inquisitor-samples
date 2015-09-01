module.exports = {
  //verbose: true,
  suites: ['test/behaviour/'],
  plugins: {
    local: {
      browsers: ['chrome', 'firefox']
    }
  }
};
