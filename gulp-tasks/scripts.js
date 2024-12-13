const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');

function scripts() {
  return src('./src/**/*.ts') // Target all TS files in the src directory
    .pipe(
      babel({
        presets: [
          ['@babel/preset-env', { targets: { node: '20' } }],
          '@babel/preset-typescript',
        ],
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-transform-class-properties', { loose: true }],
        ],
      })
    ) 
    .pipe(terser())
    .pipe(dest('./build/js')); // Output compiled and minified JS to the build/js directory
}

module.exports = scripts;

