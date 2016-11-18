const gulp = require("gulp");
const browserify = require("gulp-browserify");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const connect = require("gulp-connect");
const plumber = require("gulp-plumber");

gulp.task("scripts", () => {
  return gulp.src("./src/index.js")
    .pipe(plumber())
    .pipe(browserify({
    }))
    .pipe(babel({
      presets: ["es2015"]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task("watch", ["scripts"], () => {
  return watch("src/**/*.js", () => {
      console.log("scripts changed");
      gulp.start("scripts");
  });
});

gulp.task("connect", () => {
  connect.server({
    port: 8888
  });
});

gulp.task("default", ["connect", "watch"]);
