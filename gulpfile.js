require("es6-promise").polyfill();

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    twig = require("gulp-twig"),
    data = require("gulp-data"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    browserSync = require("browser-sync").create(),
    copy = require('gulp-copy'),
    typograf = require('gulp-typograf'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task("css", function () {
  var processors = [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-nested"),
    require("postcss-simple-vars"),
    require("postcss-color-function"),
    require("postcss-calc"),
    require("lost"),
    autoprefixer({
      browsers: ["last 2 version"]
    })
  ];

  gulp.src("source/assets/css/style.css")
  .pipe(postcss(processors))
  .pipe(gulp.dest("public/css"));
});

gulp.task("images", function() {
  gulp.src("source/assets/images/**/*.{jpg,svg,png}")
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest("public/images"));
});

gulp.task("js-libs", function() {
  gulp.src([
    "source/assets/js/plugins/particles.min.js",
    "source/assets/js/plugins/jquery-3.3.1.min.js",
    "source/assets/js/plugins/parsley.min.js",
  ])
  .pipe(concat("libs.js"))
  .pipe(gulp.dest("public/js"));
});

gulp.task("js-source", function() {
  gulp.src([
    "source/assets/js/main.js"
  ])
  .pipe(concat("script.js"))
  .pipe(gulp.dest("public/js"));
});

gulp.task("compile", function () {
  gulp.src("source/templates/index.twig")
  .pipe(data(require("./source/data/contacts.json")))
  .pipe(data(require("./source/data/development.json")))
  .pipe(data(require("./source/data/features.json")))
  .pipe(data(require("./source/data/intro.json")))
  .pipe(data(require("./source/data/technologies.json")))
  .pipe(twig())
  .pipe(gulp.dest("./public"));
});

gulp.task("server", function () {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });

  gulp.watch("public/js/**/*.js").on("change", browserSync.reload);
  gulp.watch("public/css/**/*.css").on("change", browserSync.reload);
  gulp.watch("public/**/*.html").on("change", browserSync.reload);
});

gulp.task("watch", function() {
  gulp.watch("source/assets/css/**/*.css", ["css"]);
  gulp.watch("source/assets/js/components/**/*.js", ["js-libs"]);
  gulp.watch("source/assets/js/plugins/**/*.js", ["js-libs"]);
  gulp.watch("source/assets/js/**/*.js", ["js-source"]);
  gulp.watch("source/assets/images/**/*.{jpg,svg,png}", ["images"]);
  gulp.watch("source/templates/**/*.twig", ["compile"]);
  gulp.watch("source/data/**/*.json", ["compile"]);
});

gulp.task('typograf', function() {
  gulp.src('public/*.html')
  .pipe(typograf({ locale: ['en-US'] }))
  .pipe(gulp.dest('./public/'));
});

gulp.task("js", ["js-libs", "js-source"]);
gulp.task("build", ["compile"]);
gulp.task("default", ["js", "css", "compile"]);