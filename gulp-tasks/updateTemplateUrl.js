const { src, dest } = require('gulp');
const replace = require('gulp-replace');
const through = require('through2');

// function logFile() {
//     return through.obj(function (file, enc, cb) {
//         console.log(`Processing file: ${file.path}`);
//         cb(null, file);
//     });
// }

function updateTemplatePaths() {
    return src('./build/js/**/*.js')
        // .pipe(logFile())
        .pipe(replace(/templateUrl:\s*['"](.+?)['"]/g, (match, p1) => {
            const newPath = p1.replace(/^\.\/(.+\.html)$/, '../../html/app/pages/$1');
            return `templateUrl: '${newPath}'`;
        }))
        .pipe(dest('./build/js'));
}


module.exports = updateTemplatePaths;
