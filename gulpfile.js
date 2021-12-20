const { src, dest, series } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const gulpWebpack = require("webpack-stream");

const processHTML = () => {
  return src("src/*.html").pipe(dest("dist"));
};

const processCSS = () => {
  return src("src/css/*.css")
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/css"));
};

const processJS = () => {
  return src("src/js/*.js")
    .pipe(gulpWebpack({ mode: "development", output: { filename: "app.js" } }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest("dist/js"));
};

exports.default = series(processHTML, processCSS, processJS);
exports.html = processHTML;
exports.css = processCSS;
exports.js = processJS;
