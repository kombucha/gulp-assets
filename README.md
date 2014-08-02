# gulp-assets [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependency Status][depstat-image]][depstat-url]

[gulp](https://github.com/wearefractal/gulp) plugin that gets javascript and stylesheet srcs from a file(s)


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
        css: false,
        commentWrappers: false
  }))
  .pipe(gulp.dest("./dist"));
```

__Optional__ - Only get srcs from defined build sections in your html document

```javascript
var assets = require("gulp-assets");

gulp.src("./src/*.html")
    .pipe(assets({
      js: true,
        css: false,
        commentWrappers: true
  }))
  .pipe(gulp.dest("./dist"));
```

```html
<!-- build:css -->
<link rel="stylesheet" href="css/foo.css"/>
<link rel="stylesheet" href="css/bar.css"/>
<link rel="stylesheet" href="css/baz.css"/>
<!-- endbuild -->


<!-- build:js -->
<script src="js/foo.js"></script>
<script src="js/bar.js"></script>
<script src="js/baz.js"></script>
<!-- endbuild -->

```

Shortcuts methods (thanks @kjbekkelund):
```javascript
assets.js(); // Only js files
assets.css(); // Only css files
```

## API

### assets(options)

#### options.js
Type: `boolean`
Default: true

Whether you wish to get javascript files

#### options.css
Type: `boolean`
Default: false

Whether you wish to get css files


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-assets
[npm-image]: https://badge.fury.io/js/gulp-assets.png

[travis-url]: http://travis-ci.org/kombucha/gulp-assets
[travis-image]: https://secure.travis-ci.org/kombucha/gulp-assets.png?branch=master

[coveralls-url]: https://coveralls.io/r/kombucha/gulp-assets
[coveralls-image]: https://coveralls.io/repos/kombucha/gulp-assets/badge.png

[depstat-url]: https://david-dm.org/kombucha/gulp-assets
[depstat-image]: https://david-dm.org/kombucha/gulp-assets.png
