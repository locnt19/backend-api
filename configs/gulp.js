var paths = {
  dist_dir: 'public',
  dist_files: 'public/**/*.*',
  library: 'public/**/libs.*',
  views: {
    src: 'src/views/**/*.pug',
    dist: 'public'
  },
  styles: {
    src: 'src/styles/**/*.sass',
    dist: 'public/stylesheets'
  },
  scripts: {
    src: 'src/scripts/**/*.js',
    dist: 'public/javascripts'
  },
  images: {
    src: 'src/images/**/*',
    dist: 'public/images'
  },
  fonts: {
    src: 'src/fonts/**/*',
    dist: 'public/fonts'
  },
};

module.exports = {
  paths: paths,
  plugins: {
    browserSync: {
      proxy: "localhost:3000",
      port: 5000,
      files: [
        paths.dist_files
      ],
      notify: false
    },
    nodemon: {
      script: './bin/www',
    }
  }
};