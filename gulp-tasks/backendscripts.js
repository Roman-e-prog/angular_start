const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function backendscripts() {
  return src('backend/**/*.ts') 
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(uglify())
    .pipe(dest('frontend/build/js')); // Output the compiled and minified JS to the dist/js directory
}

module.exports = backendscripts;