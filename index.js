'use strict';

var through = require('through'),
    gutil = require('gulp-util'),
    fs = require('fs'),
    path = require('path');

module.exports = function (opts) {

    opts = opts || {};
    opts.js = 'js' in opts ? opts.js : true;
    opts.css = 'css' in opts ? opts.css : false;
    opts.commentWrappers = 'commentWrappers' in opts ? opts.commentWrappers : false;

    function findJavascriptResources(htmlStr) {
        var BUILD_REGEX = /(<!-- build:js -->)([\s\S]*?)(<!-- endbuild -->)/,
            JS_REGEX = /<script.*?src=(?:'|")(.*?)(?:'|")/g,
            resultsArray = [],
            matchArray;

        if(opts.commentWrappers) {
            htmlStr = BUILD_REGEX.exec(htmlStr)[2];
        }

        while (matchArray = JS_REGEX.exec(htmlStr)) {
            resultsArray.push(matchArray[1]);
        }

        return resultsArray;
    }

    function findCSSResources(htmlStr) {
        var BUILD_REGEX = /(<!-- build:css -->)([\s\S]*?)(<!-- endbuild -->)/,
            CSS_REGEX = /<link.*?href=(?:'|")(.*?)(?:'|")/g,
            resultsArray = [],
            matchArray;

        if(opts.commentWrappers) {
            htmlStr = BUILD_REGEX.exec(htmlStr)[2];
        }

        while (matchArray = CSS_REGEX.exec(htmlStr)) {
            resultsArray.push(matchArray[1]);
        }

        return resultsArray;
    }

    return through(function (file) {
        if (!(file.contents instanceof Buffer)) {
            return this.emit('error', new gutil.PluginError('gulp-assets', 'Streams not supported'));
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
            var filePath = path.join(file.base, fileSrc);

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

module.exports.js = function() {
    return this({ css: false, js: true });
};

module.exports.css = function() {
    return this({ css: true, js: false });
};
