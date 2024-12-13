const { src, dest } = require('gulp');

function moveServerFiles() {
  return src('./dist/server/**/*') // Angular's server output
    .pipe(dest('./build/server'));
}

module.exports = moveServerFiles;
