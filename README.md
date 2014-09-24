# grunt-htmllint

[![npm version](http://img.shields.io/npm/v/grunt-htmllint.svg?style=flat-square)](https://npmjs.org/package/htmllint)
[![license](http://img.shields.io/npm/l/grunt-htmllint.svg?style=flat-square)](https://npmjs.org/package/htmllint)
[![dependencies](http://img.shields.io/david/htmllint/grunt-htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint)
[![devDependencies](http://img.shields.io/david/dev/htmllint/grunt-htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/htmllint)

[![Stories in Ready](https://badge.waffle.io/htmllint/grunt-htmllint.svg?label=ready&title=Ready)](http://waffle.io/htmllint/grunt-htmllint)

> Unofficial html5 linter and validator.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-htmllint --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-htmllint');
```

## The "htmllint" task

### Overview
In your project's Gruntfile, add a section named `htmllint` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  htmllint: {
    your_target: {
	  options: {
	    force: false,
		opts: { /* htmllint options go here */ }
	  },
	  src: [
        'path/to/yo/html_files'
      ]
    }
  },
});
```

### Options

#### options.force
Type: `Boolean`
Default value: `false`

A boolean value that determines whether or not to fail the build on any lint error. If the value is true, lint errors will not fail the build.

#### options.opts
Type: `Object`
Default value: `{}`

The object passed to [htmllint](https://github.com/htmllint/htmllint) as the `opts` argument.

### Usage Examples

#### Default Options
In this example the default options are used to lint the html files in `test/fixtures`.
If any of the html files have any lint error, the task will fail and print the errors
on the screen.

```js
grunt.initConfig({
  htmllint: {
    options: {},
    src: [
      'test/fixtures/*.html'
    ],
  },
});
```

#### Custom Options
In this example, some custom options are passed. If any lint errors occur, they will not
fail the task, but will still be printed. Also, no more than 5 lint errors will be
reported. After hitting the maximum number of errors, no more files will be processed.

```js
grunt.initConfig({
  htmllint: {
    options: {
      force: true,
	  opts: { maxerr: 5 }
    },
    src: [
      'test/fixtures/*.html'
    ],
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

### v0.1.1

* added `opts.maxerr` option support
* froze `htmllint` dependency

### v0.1.0

* added a functional implementation, was too lazy to document it
