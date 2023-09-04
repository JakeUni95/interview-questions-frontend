var gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('node-sass');
gulp.task('build:styles', function () {
   return gulp.src('./styles/**/*.scss')
   .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./dist/'));
});
