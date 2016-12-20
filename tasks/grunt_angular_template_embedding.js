/*
 * grunt-angular-template-embedding
 *
 *
 * Copyright (c) 2016 Andrea Pinucci
 * Licensed under GNU General Public License v 3.0
 */

'use strict';

var minify  = require('html-minifier').minify;
var path = require('path');
var jsesc = require('jsesc');

module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('embedtemplates', 'Inline template generator for AngularJS directives.', function () {
    var options = this.options({
      htmlmin: {
        collapseBooleanAttributes:      true,
        collapseWhitespace:             true,
        removeAttributeQuotes:          true,
        removeComments:                 false,
        removeEmptyAttributes:          false,
        removeRedundantAttributes:      false,
        removeScriptTypeAttributes:     true,
        removeStyleLinkTypeAttributes:  true
      }
    });
    this.files.forEach(function (file) {
      var dest = file.dest;
      var src = file.src.filter(function (filepath) {
        if (!grunt.file.exists(filepath))
        {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        else
        {
          var filename = path.basename(filepath);
          var contents = grunt.file.read(filepath);
          var cs = contents.split("\n");
          for (var i = 0; i < cs.length; i++)
          {
              if(cs[i].indexOf("templateUrl") != -1)
              {
                var open_quote_index = cs[i].indexOf("'");
                cs[i] = cs[i].substring(open_quote_index+1);
                var close_quote_index = cs[i].indexOf("'");
                cs[i] = cs[i].substring(0, close_quote_index);
                var template = grunt.file.read("." + cs[i]);
                template = minify(template, options.htmlmin);
                template = jsesc(template);
                src = 'template:\'' + template + '\''
                var output = '' + src + '\n';
                cs[i] = output;
              }
          }
          var dcontents = cs.join("\n");
          var folder = filepath.split( '/' ).slice( 0, -1 ).join( '/' );
          var dest_path = folder + "/" + dest;
          grunt.file.write(dest_path, dcontents);
          grunt.log.writeln('File "' + dest_path + '" created.');
        }
      })
    });
  });
};
