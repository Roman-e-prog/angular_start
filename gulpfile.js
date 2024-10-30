const gulp = require('gulp');
const clean = require('gulp-clean');
const styles = require('./gulp-tasks/styles');
const scripts = require('./gulp-tasks/scripts');
const env = require('gulp-env');
const nodemon = require('gulp-nodemon');
const replace = require('gulp-replace');
const htmlmin = require('gulp-htmlmin'); 
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const dotenv = require('dotenv');
const backendscripts = require('./gulp-tasks/backendscripts');
const { exec } = require('child_process');
dotenv.config();
gulp.task('log', function(done) {
	console.log('Gulp is running');
	done();
});
gulp.task('clean', () => {
	console.log('Running clean task');
	return gulp.src('frontend/build', { allowEmpty: true })
		.pipe(clean());
});
gulp.task('backendscripts', backendscripts);
gulp.task('styles', styles);
gulp.task('scripts', scripts);

gulp.task('update-import-paths', () => {
	console.log('Running update-import-paths task');
	return gulp.src('frontend/build/js/**/*.js')
	  .pipe(replace(/\.scss/g, '.css'))
	  .pipe(gulp.dest('frontend/build/js'))
	  .on('data', (file) => {
		  console.log(`Processed file: ${file.path}`);
	  });
});
gulp.task('move-html', function() {
	return gulp.src('frontend/src/*.html')
	  .pipe(useref())
	  .pipe(htmlmin({ collapseWhitespace: true }))
	  .pipe(rename('index.html'))
	  .pipe(gulp.dest('frontend/build/'));
  });
  
gulp.task('nodemon', function(done) {
	nodemon({
	  script: 'backend/index.ts',
	  ext: 'ts',
	  env: { 'NODE_ENV': 'production', 'DB_USER': 'postgres' , 'DB_HOST': 'postgres' }, 
	  done: done
	});
  });


gulp.task('watch', function() {
	gulp.watch('frontend/src/**/*.scss', gulp.series('styles'));
	gulp.watch('frontend/src/**/*.jsx', gulp.series('scripts'));
	gulp.watch('backend/**/*.js', gulp.series('backendscripts'));
});

gulp.task('frontend-build', gulp.series('log', 'clean', 'styles', 'scripts', 'update-import-paths', 'move-html'));
gulp.task('backend-build', gulp.series('log', 'backendscripts', 'nodemon'));
gulp.task('default', gulp.series('frontend-build', 'backend-build', 'watch'));
		