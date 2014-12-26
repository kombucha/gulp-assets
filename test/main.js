/*global describe, it*/
"use strict";

var fs = require("fs"),
    es = require("event-stream"),
    should = require("should");
require("mocha");

var gutil = require("gulp-util"),
    assets = require("../");

describe("gulp-assets", function () {

    it("should find the javascript files", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets({
                js: true,
                css: false
            }),
            javascriptFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            javascriptFiles.push(newFile.path);
        });

        stream.on("end", function () {
            javascriptFiles.should.have.lengthOf(2);
            javascriptFiles.should.containEql('test/fixtures/js/foo.js');
            javascriptFiles.should.containEql('test/fixtures/js/bar.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the javascript files using shorthand helper", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets.js(),
            javascriptFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            javascriptFiles.push(newFile.path);
        });

        stream.on("end", function () {
            javascriptFiles.should.have.lengthOf(2);
            javascriptFiles.should.containEql('test/fixtures/js/foo.js');
            javascriptFiles.should.containEql('test/fixtures/js/bar.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the javascript files within the comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets({
                js: true,
                css: false
            }),
            javascriptFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            javascriptFiles.push(newFile.path);
        });

        stream.on("end", function () {
            javascriptFiles.should.have.lengthOf(1);
            javascriptFiles.should.containEql('test/fixtures/js/bar.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the javascript files using shorthand helper within the comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets.js(),
            javascriptFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            javascriptFiles.push(newFile.path);
        });

        stream.on("end", function () {
            javascriptFiles.should.have.lengthOf(1);
            javascriptFiles.should.containEql('test/fixtures/js/bar.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the javascript files within the tagged comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets({
                js: 'js2',
                css: false
            }),
            javascriptFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            javascriptFiles.push(newFile.path);
        });

        stream.on("end", function () {
            javascriptFiles.should.have.lengthOf(1)
            javascriptFiles.should.containEql('test/fixtures/js/foo.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the javascript files using shorthand helper within the tagged comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets.js('js2'),
            javascriptFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            javascriptFiles.push(newFile.path);
        });

        stream.on("end", function () {
            javascriptFiles.should.have.lengthOf(1)
            javascriptFiles.should.containEql('test/fixtures/js/foo.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css files", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets({
                js: false,
                css: true
            }),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(2);
            cssFiles.should.containEql('test/fixtures/css/foo.css');
            cssFiles.should.containEql('test/fixtures/css/bar.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should ONLY find the css files", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-only-css.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-only-css.html")
            }),
            stream = assets({
                js: false,
                css: true
            }),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(2);
            cssFiles.should.containEql('test/fixtures/css/foo.css');
            cssFiles.should.containEql('test/fixtures/css/bar.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css files using shorthand helper", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets.css(),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(2);
            cssFiles.should.containEql('test/fixtures/css/foo.css');
            cssFiles.should.containEql('test/fixtures/css/bar.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css files only within comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets({
                js: false,
                css: true
            }),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(1)
            cssFiles.should.containEql('test/fixtures/css/bar.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css files using shorthand helper only with comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets.css(),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(1)
            cssFiles.should.containEql('test/fixtures/css/bar.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css files only within tagged comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets({
                js: false,
                css: 'css2'
            }),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(1)
            cssFiles.should.containEql('test/fixtures/css/foo.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css files using shorthand helper only with tagged comments", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo-comments.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo-comments.html")
            }),
            stream = assets.css('css2'),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(1);
            cssFiles.should.containEql('test/fixtures/css/foo.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css file even if they are in another path", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets({
                js: false,
                css: true,
                cwd: '../fixtures_2'
            }),
            cssFiles = [];

        stream.on("error", function (err) {
            should.exist(err);
            done(err);
        });

        stream.on("data", function (newFile) {
            cssFiles.push(newFile.path);
        });

        stream.on("end", function () {
            cssFiles.should.have.lengthOf(2)
            cssFiles.should.containEql('test/fixtures_2/css/foo.css')
            cssFiles.should.containEql('test/fixtures_2/css/bar.css');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should error on stream", function (done) {

        var srcFile = new gutil.File({
            path: "test/fixtures/foo.html",
            cwd: "test/",
            base: "test/fixtures",
            contents: fs.createReadStream("test/fixtures/foo.html")
        });

        var stream = assets();

        stream.on("error", function (err) {
            should.exist(err);
            done();
        });

        stream.on("data", function (newFile) {
            newFile.contents.pipe(es.wait(function (err, data) {
                done(err);
            }));
        });

        stream.write(srcFile);
        stream.end();
    });

});
