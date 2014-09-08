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
            javascriptFiles.should.have.lengthOf(4)
                .and.contain('test/fixtures/js/foo.js')
                .and.contain('test/fixtures/js/bar.js')
                .and.contain('test/fixtures/js/secondary.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the javascript files whithin build comment when commentWrapper is primary", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets({
                js: true,
                css: false,
                jsWrapper: 'primary'
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
            javascriptFiles.should.have.lengthOf(2)
                .and.contain('test/fixtures/js/foo.js')
                .and.contain('test/fixtures/js/bar.js');
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the javascript files whithin build comment when commentWrapper is secondary", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets({
                js: true,
                css: false,
                jsWrapper: 'secondary'
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
                .and.contain('test/fixtures/js/secondary.js');
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
            javascriptFiles.should.have.lengthOf(4)
                .and.contain('test/fixtures/js/foo.js')
                .and.contain('test/fixtures/js/bar.js')
                .and.contain('test/fixtures/js/secondary.js');
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
            cssFiles.should.have.lengthOf(3)
                .and.contain('test/fixtures/css/foo.css')
                .and.contain('test/fixtures/css/bar.css');;
            done();
        });

        stream.write(srcFile);
        stream.end();
    });

    it("should find the css files only whithin build primary comment", function (done) {

        var srcFile = new gutil.File({
                path: "test/fixtures/foo.html",
                cwd: "test/",
                base: "test/fixtures",
                contents: fs.readFileSync("test/fixtures/foo.html")
            }),
            stream = assets({
                js: false,
                css: true,
                cssWrapper: 'primary'
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
                .and.contain('test/fixtures/css/foo.css')
                .and.contain('test/fixtures/css/bar.css');;
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
            cssFiles.should.have.lengthOf(3)
                .and.contain('test/fixtures/css/foo.css')
                .and.contain('test/fixtures/css/bar.css');;
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
