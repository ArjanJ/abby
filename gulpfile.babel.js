'use strict';

import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import cssnano from 'gulp-cssnano';
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

const bs = browserSync.create();

const dirs = {
	src: './src',
	build: './build',
	docs: './docs',
};

const paths = {
	css: {
		src: `${dirs.src}/**/*.scss`,
		build: `${dirs.build}`,
		docs: './docs/*.scss'
	},
	deploy: `${dirs.docs}/**/*`
};

gulp.task('default', ['serve', 'watch', 'styles', 'docStyles']);

gulp.task('serve', serve);

gulp.task('watch', watch);

gulp.task('styles', styles);

gulp.task('docStyles', ['styles'], docStyles);

gulp.task('deploy', deploy);

function serve() {
	bs.init({
		server: {
			baseDir: '.'
		},
		open: false,
		notify: false
	});
}

function watch() {
	gulp.watch(paths.css.src, ['styles', 'docStyles']);
	gulp.watch(paths.css.docs, ['docStyles']);
}

function styles() {
	return gulp.src(paths.css.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', handleError)
		.pipe(postcss([
			autoprefixer()			
		]))
		.pipe(rename('abby.css'))
		.pipe(cssnano())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.css.build))
		.pipe(bs.stream());
}

function docStyles() {
	return gulp.src(paths.css.docs)
			.pipe(sass())
			.on('error', handleError)
			.pipe(postcss([
				autoprefixer()			
			]))
			.pipe(gulp.dest(dirs.docs))
			.pipe(bs.stream());
}

function deploy() {
	return gulp.src(paths.deploy)
		.pipe(ghPages());
}

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}