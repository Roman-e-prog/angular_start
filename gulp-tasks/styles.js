const {src, dest} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');

function styles() {
  return src('./src/**/*.scss') // This targets all SCSS files in the frontend/src directory
    .pipe(sass({
      quietDeps:true
    }).on('error', sass.logError))
    .pipe(cleanCSS({ compatibility: 'ie8' })) // Minify the CSS
    .pipe(dest('./build/css')); // Output the compiled and minified CSS to the dist/css directory
}

module.exports = styles;
