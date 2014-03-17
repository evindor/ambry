var gulp = require('gulp'),
    browserify = require('gulp-browserify');

gulp.task('build', function() {
    gulp.src('./client/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('./public/javascripts/build/'));
});
