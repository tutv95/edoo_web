var gulp = require('gulp'),
    watch = require('gulp-watch'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

// Default Task
gulp.task('default', ['watch']);

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(livereload());
});

gulp.task('js', function () {
    gulp.src('app/*.js')
        .pipe(livereload());
});

gulp.task('sass', function () {
    return gulp.src('app/assets/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/assets/css'))
        .pipe(livereload());
});