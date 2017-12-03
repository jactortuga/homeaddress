var gulp          = require('gulp');
var sass          = require('gulp-sass');
var cleanCSS      = require('gulp-clean-css');
var browserSync   = require('browser-sync').create();
var uglify        = require('gulp-uglify');
var concat        = require('gulp-concat');

gulp.task('scripts', function(){
  return gulp.src(['./src/js/*.js'])
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('./dist/js/'));
});

gulp.task('scss', function() {
  gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css/'));
});

gulp.task('build',['scss', 'scripts']);

gulp.task('browser-sync', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: './',
      routes: {
        '/node_modules': 'node_modules'
      }
    },
    browser: 'google chrome'
  });
});


gulp.task('default', ['browser-sync'], function(){
  gulp.watch('./src/**/*.*', ['build']);
  gulp.watch('./dist/**/*.*').on('change', browserSync.reload);
});
