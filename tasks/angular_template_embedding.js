/*
 * grunt-angular-template-embedding
 * https://github.com/pinoinside/grunt-angular-template-embedding
 *
 * Copyright (c) 2016 Andrea Pinucci
 * Licensed under the GPLv3 license.
 */

'use strict';

var minify  = require('html-minifier').minify;
var jsesc = require('jsesc');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('embedtemplates', 'Simple Grunt plugin for angular template embed in directives', function() {
    // Merge task-specific and/or target-specific options with these defaults.
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
          var contents = grunt.file.read(filepath);
          var cs = contents.split("\n");
          for (var i = 0; i < cs.length; i++)
          {
              var templateUrl_index = cs[i].indexOf("templateUrl");
              var comma = cs[i].trim().endsWith(",");
              if(templateUrl_index != -1)
              {
                var prefix = cs[i].substring(0, templateUrl_index);
                var open_quote_index = cs[i].indexOf("'");
                cs[i] = cs[i].substring(open_quote_index+1);
                var close_quote_index = cs[i].indexOf("'");
                cs[i] = cs[i].substring(0, close_quote_index);
                var template = grunt.file.read("." + cs[i]);
                template = minify(template, options.htmlmin);
                template = jsesc(template);
                src = prefix + 'template:\'' + template + '\''
                var output = '' + src;
                if(comma)
                  output = output + ",";
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
