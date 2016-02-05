'use strict';

import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import ghPages from 'gulp-gh-pages';
import gulp from 'gulp';
import minifyCSS from 'gulp-minify-css';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import swig from 'gulp-swig';

const bs = browserSync.create();

const dirs = {
	src: './src',
	build: './build'
};

const paths = {
	templates: {
		src: `${dirs.src}/templates/**/*.swig`,
		views: `${dirs.src}/templates/views/*.swig`,
		build: dirs.build
	},
	css: {
		src: `${dirs.src}/assets/css/*.scss`,
		build: `${dirs.build}/assets/css`
	},
	deploy: `${dirs.build}/**/*`
};

gulp.task('default', ['serve', 'watch', 'templates', 'styles']);

gulp.task('serve', serve);

gulp.task('watch', watch);

gulp.task('templates', templates);

gulp.task('styles', styles);

gulp.task('deploy', deploy);

function serve() {
	bs.init({
		server: {
			baseDir: dirs.build
		},
		open: false,
		notify: false
	});
}

function watch() {
	gulp.watch(paths.templates.src, ['templates', bs.reload]);
	gulp.watch(paths.css.src, ['styles']);
}

function templates() {
	return gulp.src(paths.templates.views)
		.pipe(swig({
			defaults: {
				cache: false
			}
		}))
		.on('error', handleError)
		.pipe(gulp.dest(paths.templates.build));
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
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.css.build))
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