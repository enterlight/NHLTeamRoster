var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function() {
	return browserify('./public/js/app.js')
    .transform(babelify, {presets: ["stage-0", "react", "env"]})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
    /* Kee an eye on every files that ends with .js and run borwserify if they change */
    gulp.watch('**/js/*.js', ['browserify']);
});