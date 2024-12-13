const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
// const uglify = require('gulp-uglify');
function backendscripts() {
  return src('backend/**/*.ts') 
    .pipe(babel({
      presets: [['@babel/preset-env', { targets: { node: '20' }}], '@babel/preset-typescript',],
    }))
    .pipe(terser())
    .pipe(dest('frontend/build/js')); // Output the compiled and minified JS to the build/js directory
} //running with ng build I put it in the build/server

module.exports = backendscripts;