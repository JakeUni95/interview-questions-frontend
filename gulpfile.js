const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const sassLibrary = require('sass');
const sassCompiler = require('node-sass');

const sass = gulpSass(sassLibrary);
sass.compiler = sassCompiler;

gulp.task('build:styles', () => {
  return gulp.src('./styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/'));
});
