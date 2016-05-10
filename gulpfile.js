'use strict';

const gulp = require('gulp'),
    rollup = require('gulp-rollup'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    sequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    path = require('path');

const paths = {
    src: {
        root: './src',
        css: './src/style',
        js: './src/app'
    },
    dist: {
        root: './.tmp',
        css: './.tmp/css',
        js: './.tmp/js'
    }
};

function sassHandler (isWatch) {
    const handler = gulp.src(`${paths.src.css}/style.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.dist.css));

    if (isWatch) {
        handler.pipe(browserSync.stream());
    }

    return handler;
}

function jsHandler (isWatch) {
    const handler = gulp.src(`${paths.src.js}/index.js`)
        .pipe(rollup({
            format: 'umd',
            banner: `'use strict';\n`
        }))
        .pipe(gulp.dest(paths.dist.js));

    if (isWatch) {
        handler.pipe(browserSync.stream());
    }

    return handler;
}

gulp.task('clean', () => {
    return gulp.src(paths.dist.root, {read: false})
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
            css: gulp.src(`${paths.dist.css}/*.css`, {read: false}),
            js: gulp.src(`${paths.dist.js}/*.js`, {read: false})
        },
        options = {
            ignorePath: ['.tmp'],
            addRootSlash: false
        };

    return gulp.src(`${paths.src.root}/index.html`)
        .pipe(inject(files.css, options))
        .pipe(inject(files.js, options))
        .pipe(gulp.dest(paths.dist.root));
});

gulp.task('inject:watch', ['inject'], () => {
    browserSync.reload();
});

gulp.task('server', () => {
    gulp.watch(`${paths.src.css}/**/*.scss`, ['sass:watch']);
    gulp.watch(`${paths.src.js}/**/*.js`, ['scripts:watch']);
    gulp.watch(`${paths.src.root}/index.html`, ['inject:watch']);

    browserSync.init({
        server: {
            baseDir: paths.dist.root
        }
    });
});

gulp.task('default', (done) => {
    sequence('clean', 'sass', 'scripts', 'inject', 'server', () => {
        done();
    });
});
