const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const backendscripts = require('./gulp-tasks/backendscripts');
const scripts = require('./gulp-tasks/scripts');
const styles = require('./gulp-tasks/styles');
const clean = require('gulp-clean');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin'); 
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const htmlFiles = require('./gulp-tasks/html');
const updateTemplatePaths = require('./gulp-tasks/updateTemplateUrl');
const updateStylePaths = require('./gulp-tasks/updateStyleUrl');
const moveAssets = require('./gulp-tasks/moveAssets');


// Utilities to navigate directories
function navigateToFrontend(cb) {
    process.chdir('frontend');
    cb();
}

function navigateBack(cb) {
    process.chdir('../');
    cb();
}

// Frontend tasks
gulp.task('clean-frontend', () => {
    return gulp.src('./build', { allowEmpty: true })
        .pipe(clean());
});
gulp.task('move-indexHtml', function() {
    return gulp.src('./src/index.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./build')); // Moves to the root of the build folder
});
gulp.task('move-favicon-icon', function(){
    return gulp.src('./src/favicon.ico') // Path to favicon.ico
    .pipe(gulp.dest('./build'));
})
gulp.task('move-uploads-folder', function(){
    return gulp.src('./src/uploads/**/*', { allowEmpty: true }) // Copy uploads folder
    .pipe(gulp.dest('./build/uploads'));
})

gulp.task('frontend-build', gulp.series(
    navigateToFrontend,
    'clean-frontend',
    styles,
    htmlFiles,
    scripts,
    updateStylePaths,
    updateTemplatePaths,
    moveAssets,
    'move-indexHtml',
    'move-favicon-icon',
    'move-uploads-folder',
    navigateBack
));

// Backend tasks
gulp.task('nodemon', function(done) {
    nodemon({
        script: 'backend/index.ts',
        ext: 'ts',
        env: { 'NODE_ENV': 'production', 'DB_USER': 'postgres', 'DB_HOST': 'postgres' },
        done: done
    });
});

gulp.task('backend-build', gulp.series(backendscripts, 'nodemon'));

// Watch tasks
gulp.task('watch', function() {
    gulp.watch('frontend/src/**/*.scss', gulp.series(styles));
    gulp.watch('frontend/src/**/*.html', gulp.series(htmlFiles));
    gulp.watch('frontend/src/**/*.ts', gulp.series(scripts));
    gulp.watch('backend/**/*.ts', gulp.series(backendscripts));
});

// Default task
gulp.task('default', gulp.series('frontend-build', 'backend-build', 'watch'));
