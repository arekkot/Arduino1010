'use strict';

const gulp = require('gulp'),
    rollup = require('gulp-rollup'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    sequence = require('run-sequence'),
    browserSync = require('browser-sync').create();

function sassHandler (isWatch) {
    const handler = gulp.src('./src/style/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./.tmp/css'));

    if (isWatch) {
        handler.pipe(browserSync.stream());
    }

    return handler;
}

function jsHandler (isWatch) {
    const handler = gulp.src('./src/app/index.js')
        .pipe(rollup({
            format: 'umd',
            banner: `'use strict';\n`
        }))
        .pipe(gulp.dest('./.tmp/js'));

    if (isWatch) {
        handler.pipe(browserSync.stream());
    }

    return handler;
}


gulp.task('clean', () => {
    return gulp.src('./.tmp/', {read: false})
        .pipe(clean({
            force: true
        }));
});

gulp.task('sass', () => {
    return sassHandler(false);
});

gulp.task('sass:watch', () => {
    return sassHandler(true);
});

gulp.task('scripts', () => {
    return jsHandler(false);
});

gulp.task('scripts:watch', () => {
    return jsHandler(true);
});

gulp.task('inject', () => {
    const files = {
            css: gulp.src('./.tmp/css/*.css', {read: false}),
            js: gulp.src('./.tmp/js/*.js', {read: false})
        },
        options = {
            ignorePath: ['.tmp'],
            addRootSlash: false
        };

    return gulp.src('src/index.html')
        .pipe(inject(files.css, options))
        .pipe(inject(files.js, options))
        .pipe(gulp.dest('.tmp/'));
});

gulp.task('inject:watch', ['inject'], () => {
    browserSync.reload();
});

gulp.task('server', () => {
    gulp.watch('./src/style/**/*.scss', ['sass:watch']);
    gulp.watch('./src/app/**/*.js', ['scripts:watch']);
    gulp.watch('./src/index.html', ['inject:watch']);

    browserSync.init({
        server: {
            baseDir: './.tmp'
        }
    });
});

gulp.task('default', (done) => {
    sequence('clean', 'sass', 'scripts', 'inject', 'server', () => {
        done();
    });
});
