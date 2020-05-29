"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const server = require("gulp-server-livereload");
const imagemin = require("gulp-imagemin");
const minify = require("gulp-minify");
const concat = require("gulp-concat");
const jshint = require("gulp-jshint");
const autoprefixer = require("gulp-autoprefixer");

sass.compiler = require("node-sass");

const html = () => {
  return gulp.src("./src/**/*.html").pipe(gulp.dest("./dist"));
};
const js = () => {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(concat("script.js"))
    .pipe(minify({ ext: { min: ".min.js" } }))
    .pipe(gulp.dest("./dist/js"));
};
const styles = () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: true,
      })
    )
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("./dist/css"));
};
const images = () => {
  return gulp
    .src("./src/img/*")
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest("./dist/img"));
};

gulp.task("html", function () {
  gulp.watch("./src/**/*.html", html);
});

gulp.task("js", function () {
  gulp.watch("./src/js/**/*.js", js);
});

gulp.task("styles", function () {
  gulp.watch("./src/scss/**/*.scss", styles);
});

gulp.task("webserver", function () {
  gulp.src("./dist").pipe(
    server({
      livereload: true,
      directoryListing: false,
      defaultFile: "index.html",
      open: true,
    })
  );
});

gulp.task("lint", function () {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(jshint({ esnext: true }))
    .pipe(jshint.reporter("default"));
});

gulp.task("default", gulp.parallel("styles", "webserver", "html", "js"));
gulp.task("build", (done) => {
  html();
  styles();
  js();
  images();
  done();
});
