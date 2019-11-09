const
  gulp = require('gulp'),
  del = require('del'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync').create(),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  cleancss = require('gulp-clean-css'),
  sass = require('gulp-sass'),
  image = require('gulp-image'),
  readFileSync = require('graceful-fs').readFileSync;


var config = require('./config/viewsLibrary');
var public = {
  css: './public/css/',
  js: './public/js/',
  fontIcons: './public/fonts/'
}


// CLEAN CSS
gulp.task('clean:css', function () {
  return del(String(public.css + 'libs.css'));
});
// DEV CSS
gulp.task('dev:css', function () {
  return gulp.src(config.styles, {
      allowEmpty: true,
    })
    .pipe(concat('libs.css'))
    .pipe(cleancss())
    .pipe(gulp.dest(public.css));
});


// CLEAN JS
gulp.task('clean:js', function () {
  return del(String(public.js + 'libs.js'));
});
// DEV SCRIPTS
gulp.task('dev:js', function () {
  return gulp.src(config.scripts, {
      allowEmpty: true,
    })
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest(public.js))
});


// CLEAN FONTS
gulp.task('clean:fontIcons', function () {
  return del(public.fontIcons);
});
// // DEV FONT ICONS
gulp.task('dev:fontIcons', function () {
  return gulp.src(config.fonts)
    .pipe(gulp.dest(public.fontIcons));
});

// DEFAULT
gulp.task('default', gulp.series('clean:css', 'clean:js', 'clean:fontIcons', 'dev:css', 'dev:js', 'dev:fontIcons'));