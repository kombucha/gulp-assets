(PLUGIN AUTHOR: Please read [Plugin README conventions](https://github.com/wearefractal/gulp/wiki/Plugin-README-Conventions), then delete this line)

# gulp-assets [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> assets plugin for [gulp](https://github.com/wearefractal/gulp)

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

[depstat-url]: https://david-dm.org/kombucha/gulp-assets
[depstat-image]: https://david-dm.org/kombucha/gulp-assets.png
