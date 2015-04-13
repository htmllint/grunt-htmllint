# grunt-htmllint

[![npm version](http://img.shields.io/npm/v/grunt-htmllint.svg?style=flat-square)](https://npmjs.org/package/grunt-htmllint)
[![license](http://img.shields.io/npm/l/grunt-htmllint.svg?style=flat-square)](https://npmjs.org/package/grunt-htmllint)
[![dependencies](http://img.shields.io/david/htmllint/grunt-htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/grunt-htmllint)
[![devDependencies](http://img.shields.io/david/dev/htmllint/grunt-htmllint.svg?style=flat-square)](https://david-dm.org/htmllint/grunt-htmllint)

[![Stories in Ready](https://badge.waffle.io/htmllint/grunt-htmllint.svg?label=ready&title=Ready)](http://waffle.io/htmllint/grunt-htmllint)

> Unofficial html5 linter and validator.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. 

It also goes into the process of using `npm` and `node`. If you haven't installed NodeJS before, now is the time. Go to [NodeJS](http://nodejs.org/) (linked from the Grunt site) to download.  
`npm` is installed with `node`. 

Once you're familiar with that process, you may install this plugin with this command:

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
		plugins: ['htmllint-plugin-name'],
		/* htmllint options go here */
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

#### options.plugins
Type: `Array`
Default value: `[]`

An array of strings, each of which should be the name of an htmllint plugin to require and use.

#### options.htmllintrc
Type: `Boolean` or `String`
Default value: `false`

If set to true, a `.htmllintrc` file will be loaded (relative to your `Gruntfile.js`) and
will override the options argument (options.force will no be overriden).
If set to a string, the file path contained in the string will be loaded.

#### options (excluding previous options)
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

### v0.2.7

* `htmllint` -> 0.2.4

### v0.2.6

* changed `options.htmllintrc` to allow specifying path to an htmllintrc file (#11)

### v0.2.5

* `htmllint` -> 0.2.3

### v0.2.4

* `htmllint` -> 0.2.2

### v0.2.3

* `htmllint` -> 0.2.1

### v0.2.2

* added error codes to the output
* added `htmllintrc` option, allows users to specify configuration in a separate file

### v0.2.1

* released a little too hastily... (fixed a compatibility issue)

### v0.2.0

* `htmllint` -> 0.2.0
* finally got version numbers to be the same >.>

### v0.1.12

* `htmllint` -> 0.0.12

### v0.1.11

* `htmllint` -> 0.0.11
* added plugin support

### v0.1.10

* `htmllint` -> 0.0.10
* improved summary text

### v0.1.9

* `htmllint` -> 0.0.9

### v0.1.7

* `htmllint` -> 0.0.7

### v0.1.6

* `htmllint` -> 0.0.6
* fixed index errors on multiple files
* new `htmllint` fixes that stop throws on text elements

### v0.1.5

* `htmllint` -> 0.0.5
* decided to skip some versions to stay closer to the `htmllint` version number
* should fix line,col output bug
* fixed result message saying that files were all clean
* fixed option passing

### v0.1.2

* `htmllint` -> 0.0.4

### v0.1.1

* added `opts.maxerr` option support
* froze `htmllint` dependency

### v0.1.0

* added a functional implementation, was too lazy to document it
