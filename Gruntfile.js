module.exports = function(grunt) {

  grunt.initConfig({
    jasmine: {
      coverage: {
        src: ['omisepray.js'],
        options: {
          specs: ['test/*.js'],
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'bin/coverage/coverage.json',
            report: 'bin/coverage',
            thresholds: {
              lines: 90,
              statements: 90,
              branches: 90,
              functions: 90
            }
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', ['jasmine']);
};