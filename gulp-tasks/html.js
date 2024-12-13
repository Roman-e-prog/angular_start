const {src, dest} = require('gulp');
const htmlmin = require('gulp-htmlmin');
function htmlFiles(){
    return src('./src/**/*.html', '!src/index.html')
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(dest('./build/html')); 
}
module.exports = htmlFiles;


