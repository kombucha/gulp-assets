# gulp-assets

[![NPM version](https://img.shields.io/npm/v/gulp-assets.svg?style=flat)](https://www.npmjs.com/package/gulp-assets)
[![Build Status](https://img.shields.io/travis/kombucha/gulp-assets.svg?style=flat)](https://travis-ci.org/kombucha/gulp-assets)
[![Coverage Status](https://img.shields.io/coveralls/kombucha/gulp-assets.svg?style=flat)](https://coveralls.io/r/kombucha/gulp-assets)
[![Dependency Status](https://david-dm.org/kombucha/gulp-assets.svg)](https://david-dm.org/kombucha/gulp-assets)

> assets plugin for [gulp](http://gulpjs.com/)

## Usage

First, install `gulp-assets` as a development dependency:

```shell
npm install --save-dev gulp-assets
```

Then, add it to your `gulpfile.js`:

```javascript
var assets = require("gulp-assets");

gulp.src("./src/*.html")
	.pipe(assets({
		js: true,
        css: false
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### assets(options)

#### options.js

Type: either a `boolean` or a `string`  
Default: true

Whether you wish to get javascript files. If a string is used, only the javascript files between the appropriate comment tags will
be used.

Example:

```html
<!-- build:myJsTag -->
<script src="js/foo.js"></script>
<!-- endbuild -->
```

```js
assets({
    js: 'myJsTag',
    css: false
})
```

You will only get `js/foo.js` in your build stream

#### options.css

Type: either a `boolean` or a `string`  
Default: false

Whether you wish to get css files. If a string is used, only the css files between the appropriate comment tags will
be used.

Example:

```html
<!-- build:myCssTag -->
<link rel="stylesheet" href="css/foo.css"/>
<!-- endbuild -->
```

```js
assets({
    js: false
    css: 'myCssTag',
})
```

#### options.cwd

Type: `string`  
Default: `undefined`

If set, will be used as a base when building the files' paths.

### Shortcuts methods:

```javascript
assets.js(<optional tagname>); // Only js files (between comment tags if tagname is set)
assets.css(<optional tagname>); // Only css files  (between comment tags if tagname is set)
```

## Contributors

- @kjbekkelund
- @Zweer
- @shinnn

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
