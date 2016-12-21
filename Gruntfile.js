/*
 * grunt-angular-template-embedding
 * https://github.com/pinoinside/grunt-angular-template-embedding
 *
 * Copyright (c) 2016 Andrea Pinucci
 * Licensed under the GPLv3 license.
 */


'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint.
  grunt.registerTask('default', ['jshint']);
};
