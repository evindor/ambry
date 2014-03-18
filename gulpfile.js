var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    jadeify = require('jadeify');

gulp.task('build', function() {
    gulp.src('./client/app.js')
        .pipe(browserify({
            transform: [jadeify]
        }))
        .pipe(gulp.dest('./public/javascripts/build/'));
});

gulp.task('watch', function() {
    gulp.watch(['client/**/*.js', 'client/**/*.jade'], ['build']);
});
