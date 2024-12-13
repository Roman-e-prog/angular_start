const {src, dest} = require('gulp');
const replace = require('gulp-replace');
const through = require('through2');

// function logFile() {
//     return through.obj(function (file, enc, cb) {
//         console.log(`Processing file: ${file.path}`);
//         cb(null, file);
//     });
// }
function updateStylePaths() {
    return src('./build/js/**/*.js')
        // .pipe(logFile())
        .pipe(replace(/styleUrl:\s*['"](.+?)['"]/g, (match, p1) => {
            const newPath = p1
                .replace(/^\.\/(.+)\.scss$/, '../../css/app/pages/$1.css')
                .replace(/^\.\/(.+)\.css$/, '../../css/app/pages/$1.css');
            return `styleUrl: '${newPath}'`;
        }))
        .pipe(replace(/styleUrls:\s*\[['"](.+?)['"]\]/g, (match, p1) => {
            console.log(`Matched styleUrls: ${p1}`);
            const newPath = p1
                .replace(/^\.\/(.+)\.scss$/, '../../css/app/pages/$1.css')
                .replace(/^\.\/(.+)\.css$/, '../../css/app/pages/$1.css');
            console.log(`Updated styleUrls to: ${newPath}`);
            return `styleUrls: ['${newPath}']`;
        }))
        .pipe(dest('./build/js'));
}

module.exports = updateStylePaths
