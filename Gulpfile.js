var gulp = require('gulp'),
    watch = require('gulp-watch'),
    live_reload = require('gulp-livereload'),
    sass = require('gulp-sass'),
    source_maps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    jsmin = require('gulp-jsmin'),
    minifyCss = require('gulp-clean-css'),
    usemin = require('gulp-usemin');


// Default Task
gulp.task('default', ['watch']);

gulp.task('watch', function () {
    live_reload.listen();
    gulp.watch('app/**/*.html', ['html']);
    gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('html', function () {
    gulp.src('app/*.html')
        .pipe(live_reload());
});

gulp.task('js', function () {
    gulp.src('app/*.js')
        .pipe(live_reload());
});

gulp.task('sass', function () {
    return gulp.src('app/assets/scss/main.scss')
        .pipe(source_maps.init())
        .pipe(sass())
        .pipe(source_maps.write())
        .pipe(gulp.dest('app/assets/css'))
        .pipe(live_reload());
});

gulp.task('concat', function () {
    return gulp.src('app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', jsmin()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function () {
    var original_dir = 'app/';

    var vendors = [
        'bower_components/jquery/dist/jquery.js',
        'bower_components/bootstrap/dist/js/bootstrap.js',
        'bower_components/tinymce-dist/tinymce.jquery.js',
        'bower_components/moment/moment.js',
        'bower_components/moment/locale/vi.js',
        'bower_components/noty/js/noty/packaged/jquery.noty.packaged.js',
        'assets/js/theme.noty.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-sanitize/angular-sanitize.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js',
        'bower_components/angular-local-storage/dist/angular-local-storage.js',
        'bower_components/angular-loading-bar/src/loading-bar.js',
        'bower_components/angular-ui-tinymce/src/tinymce.js',
        'bower_components/angular-moment/angular-moment.js',
        'bower_components/angular-animate/angular-animate.js',
        'assets/js/main.js'
    ];

    for (var i = 0; i < vendors.length; i++) {
        vendors[i] = original_dir + vendors[i];
    }

    return gulp.src(vendors)
        .pipe(gulp.dest('dist/vendor'));
});