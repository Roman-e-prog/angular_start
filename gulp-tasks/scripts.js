const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

function scripts() {
  return src('frontend/src/**/*.ts') // Target all JSX files in the frontend/src directory
    .pipe(uglify())
    .pipe(dest('frontend/build/js')); // Output the compiled and minified JS to the dist/js directory
}

module.exports = scripts;