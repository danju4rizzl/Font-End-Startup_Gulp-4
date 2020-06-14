const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const files = {
    rootPath: 'src',
    htmlPath: `${this.rootPath}/*.html`,
    scssPath: `${this.rootPath}/scss/**/*.scss`,
    jsPath: `${this.rootPath}/js/**/*.js`
}

//compile scss into css
function scssTask() {
    return gulp.src(files.scssPath)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
}



// Watch task 
function watchTask() {
    browserSync.init({
        server: {
            baseDir: files.rootPath,
            // index: "/index.html"
        }
    });
    gulp.watch(files.scssPath, scssTask);
    gulp.watch(files.htmlPath).on('change', browserSync.reload);
    gulp.watch(files.jsPath).on('change', browserSync.reload);
}


exports.scss = scssTask;
exports.watch = watchTask;

exports.default = watchTask;