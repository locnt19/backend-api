const
  gulp = require('gulp'),
  del = require('del'),
  nodemon = require('gulp-nodemon'),
  browserSync = require('browser-sync').create(),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  cleancss = require('gulp-clean-css'),
  sass = require('gulp-sass'),
  image = require('gulp-image'),
  readFileSync = require('graceful-fs').readFileSync;


var config = require('./configs/gulp'),
  libraryPath = './configs/libs.json',
  localLibraryCSS = 'src/styles/imports/*';


// CLEAN
gulp.task('clean', function () {
  return del(config.paths.dist_dir);
});


// CLEAN LIBRARY
gulp.task('clean:library', function () {
  return del(config.paths.library);
});


// CLEAN FONTS
gulp.task('clean:fonts', function () {
  return del(config.paths.fonts.dist);
});


// CLEAN IMAGES
gulp.task('clean:images', function () {
  return del(config.paths.images.dist);
});


// STYLES
gulp.task('dev:styles', function () {
  return gulp.src(config.paths.styles.src)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cleancss())
    .pipe(gulp.dest(config.paths.styles.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// WATCH STYLES
gulp.task('watch:styles', function (done) {
  gulp.watch(config.paths.styles.src, gulp.series('dev:styles'));
  done();
});


// SCRIPTS
gulp.task('dev:scripts', function () {
  return gulp.src(config.paths.scripts.src)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.scripts.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// WATCH SCRIPTS
gulp.task('watch:scripts', function (done) {
  gulp.watch(config.paths.scripts.src, gulp.series('dev:scripts'));
  done();
});


// LIBRARY STYLES
gulp.task('dev:libStyles', function () {
  let library = JSON.parse(readFileSync(libraryPath));
  return gulp.src(library.styles, {
      allowEmpty: true,
    })
    .pipe(concat('libs.min.css'))
    .pipe(cleancss())
    .pipe(gulp.dest(config.paths.styles.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// LIBRARY SCRIPTS
gulp.task('dev:libScripts', function () {
  let library = JSON.parse(readFileSync(libraryPath));
  return gulp.src(library.scripts, {
      allowEmpty: true,
    })
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.paths.scripts.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});


// WATCH LIBRARY STYLES & SCRIPTS
gulp.task('watch:library', function (done) {
  gulp.watch([libraryPath, localLibraryCSS], gulp.series('clean:library', 'dev:libStyles', 'dev:libScripts'));
  done();
});


// IMAGES
gulp.task('dev:images', function () {
  return gulp.src(config.paths.images.src)
    .pipe(image())
    .pipe(gulp.dest(config.paths.images.dist));
});


// WATCH IMAGES
gulp.task('watch:images', function (done) {
  gulp.watch(config.paths.images.src, gulp.series('clean:images', 'dev:images'));
  done();
});


// FONT ICONS
gulp.task('dev:fontIcons', function () {
  let library = JSON.parse(readFileSync(libraryPath));
  return gulp.src(library.fonts)
    .pipe(gulp.dest(config.paths.fonts.dist));
});


// WEB FONTS
gulp.task('dev:webFonts', function () {
  return gulp.src(config.paths.fonts.src)
    .pipe(gulp.dest(config.paths.fonts.dist));
});

// WATCH FONT ICONS & WEB FONTS
gulp.task('watch:fonts', function (done) {
  gulp.watch([config.paths.fonts.src, libraryPath], gulp.series('clean:fonts', 'dev:webFonts', 'dev:fontIcons'));
  done();
});


// SERVER
gulp.task('server', function (cb) {
  var called = false;
  return nodemon(config.plugins.nodemon)
    .on('start', function () {
      if (!called) {
        called = true;
        cb();
      }
    })
});


// BROWSER-SYNC
function browserSyncInit(done) {
  browserSync.init(config.plugins.browserSync)
  done();
}
gulp.task('browser-sync', browserSyncInit);


// WATCH VIEWS
gulp.task('watch:views', function (done) {
  gulp.watch(config.paths.views.src).on('change', browserSync.reload);
  done();
});


// WATCH ROUTES
  gulp.task('watch:routes', function (done) {
    gulp.watch('routes/*').on('change', browserSync.reload);
    done();
  });


// DEV
gulp.task('dev', gulp.parallel('dev:styles', 'dev:libStyles', 'dev:fontIcons', 'dev:webFonts', 'dev:scripts', 'dev:libScripts', 'dev:images'));


// WATCH
gulp.task('watch', gulp.parallel('watch:views', 'watch:styles', 'watch:fonts', 'watch:scripts', 'watch:images', 'watch:library', 'watch:routes'));


// DEFAULT
gulp.task('default', gulp.series('clean', 'dev', 'server', gulp.parallel('watch', 'browser-sync')));