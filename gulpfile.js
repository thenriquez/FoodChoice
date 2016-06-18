// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


// Compile Our Sass
gulp.task('sass', function() {
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('public/js/angular/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('public/js/'))
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('public/js/angular/*.js', ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
