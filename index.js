'use strict';

var through = require('through'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path');

module.exports = function (opts) {

    opts = opts || {};
    opts.js = 'js' in opts ? opts.js : true;
    opts.css = 'css' in opts ? opts.css : false;
    opts.cwd = 'cwd' in opts ? opts.cwd : false;

    function findJavascriptResources(htmlStr) {
        var buildTag = typeof opts.js === 'string' ? opts.js : 'js',
            BUILD_REGEX = new RegExp('<!-- build:' + buildTag + ' -->([\\s\\S]*?)<!-- endbuild -->', 'g'),
            JS_REGEX = /<script.*?src=(?:'|")(.*?)(?:'|")/g,
            buildStr = BUILD_REGEX.exec(htmlStr),
            resultsArray = [],
            matchArray;

        while (matchArray = JS_REGEX.exec(buildStr === null ? htmlStr : buildStr[1])) {
            resultsArray.push(matchArray[1]);
        }

        return resultsArray;
    }

    function findCSSResources(htmlStr) {
        var buildTag = typeof opts.css === 'string' ? opts.css : 'css',
            BUILD_REGEX = new RegExp('<!-- build:' + buildTag + ' -->([\\s\\S]*?)<!-- endbuild -->', 'g'),
            CSS_REGEX = /<link.*?href=(?:'|")(.*?\.css)(?:'|")/gi,
            buildStr = BUILD_REGEX.exec(htmlStr),
            resultsArray = [],
            matchArray;

        while (matchArray = CSS_REGEX.exec(buildStr === null ? htmlStr : buildStr[1])) {
            resultsArray.push(matchArray[1]);
        }

        return resultsArray;
    }

    return through(function (file) {
        if (!(file.contents instanceof Buffer)) {
            return this.emit('error', new gutil.PluginError('gulp-assets', 'Streams not supported'));
        }

        if (opts.cwd === false) {
            opts.cwd = file.base;
        } else {
            opts.cwd = path.join(file.base, opts.cwd);
        }

        var htmlContent = String(file.contents),
            currentStream = this,
            filesSrc = [];

        if (opts.js) {
            filesSrc = filesSrc.concat(findJavascriptResources(htmlContent));
        }

        if (opts.css) {
            filesSrc = filesSrc.concat(findCSSResources(htmlContent));
        }

        filesSrc.forEach(function (fileSrc) {
            var filePath = path.join(opts.cwd, fileSrc);

            if(fs.existsSync(filePath)) {
                currentStream.queue(new gutil.File({
                    base: file.base,
                    cwd: file.cwd,
                    path: filePath,
                    contents: fs.readFileSync(filePath)
                }));
            }
        });
    });
};

module.exports.js = function(tag) {
    return this({ css: false, js: typeof tag === 'undefined' ? true : tag });
};

module.exports.css = function(tag) {
    return this({ css: typeof tag === 'undefined' ? true : tag, js: false });
};
