# grunt-angular-template-embedding

> Inline template generator for AngularJS directives.

## What's this?

This [Grunt](http://gruntjs.com/) plugin allows you to embed AngularJS templates inside directives.
I am aware that there are plenty other similar plugins however none did exactly what I wanted.


## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-angular-template-embedding --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-angular-template-embedding');
```

## The "embedtemplates" task

### Overview
In your project's Gruntfile, add a section named `embedtemplates` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	embedtemplates: {
   		app: {
       		src: 'src/*/directive.js',
        	dest: 'directive.ext.js'
      	}
   },
})
```

### Usage Examples

The plugin expects two options:

* `src` - directive file or files where templateUrl properties will be substituted with template property followed by minified html.
* `dest` - the file where the resultant directive will be saved (same folder of original).


```js
app.directive('yourDirective', function() {
  ...
  return{
		...,
    templateUrl:'/path/to/template.html'
  };
}]);
```


## TODO

* Add unit tests

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code using [Grunt](http://gruntjs.com/).

If you're creating a pull request, also please add yourself to the `CONTRIBUTORS.txt` file (or create it if it's necessary).

## Release History
* 0.0.1 - Initial Release

## License
Copyright (c) 2016 Andrea Pinucci, licensed under GNU General Public License v 3.0
