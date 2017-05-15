var gulp = require('gulp');


var uglify = require('gulp-uglify');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');

var clean = require('gulp-clean');



/**
 * Gulp Task
 * Delete the build directory
 */

gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean());
});



//minify js files
 
gulp.task('compress', function (cb) {
    
    console.log(cb);
  pump([
        gulp.src('src/**/*.js'),
        uglify(),
        gulp.dest('dist/src')
    ],
    cb
  );
});


//minfy css files
 
gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});


//copying other files

var filesToMove = [
        './_locales/**/*.*',
        './icons/**/*.*',
        './js/**/*.*',
        './src/browser_action/**/*.*',
        './manifest.json'
    ];

gulp.task('moveFiles', function(){
  
  gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('dist'));
});




/**
 * Gulp task
 * Run all tasks required for processing html, css, js, images, fonts, texts and libs
 */
gulp.task('runTasks', ['compress', 'minify-css', 'moveFiles']);

/**
 * Gulp task
 * Run all tasks after cleaning the output folder
 */
gulp.task('buildPack', ['clean'], function () {
    gulp.start('runTasks');
})