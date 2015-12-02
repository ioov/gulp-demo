var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var fileconcat = require('gulp-file-concat');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var gulpSequence = require('gulp-sequence');

var root_path = path.resolve(__dirname);
var src_path = path.resolve(root_path, 'src');
var dest_path = path.resolve(root_path, 'dest');

gulp.task('clean', function(){
	return gulp.src(dest_path, {read :false})
		.pipe(clean());
});

gulp.task('js', function(){
	return gulp.src( src_path + "/js/page/*.js" )
		.pipe(fileconcat({
			relativeUrls: './'
		}))
		.pipe(uglify())
		// .pipe(rename({
		// 	suffix: ".min"
		// }))
		.pipe(rev())
		.pipe( gulp.dest(dest_path + '/js/page/') )
		.pipe(rev.manifest())
		.pipe( gulp.dest( src_path + '/rev/js') );
});

gulp.task('css', function(){
	return gulp.src( src_path + "/css/page/*.css" )
		.pipe(fileconcat({
			relativeUrls: './'
		}))
		.pipe(minifycss())
		// .pipe(rename({
		// 	suffix: ".min"
		// }))
		.pipe(rev())
		.pipe(gulp.dest( dest_path + '/css/page/' ))
		.pipe(rev.manifest())
		.pipe(gulp.dest( src_path + '/rev/css' ));
});

gulp.task('md5', ['js', 'css'], function(){
	return gulp.src([src_path+'/rev/**/*.json', src_path+'/html/*.html'])
		.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
				// '/src/js/': function(manifest_value){
				// 	return 'http://cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot/' + manifest_value;
				// },
				// '/src/css/': function(manifest_value){
				// 	return 'http://cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot/' + manifest_value;
				// }
				'/src/js/': '/dest/js/',
				'/src/css/': '/dest/css/'
			}
		}))
		.pipe(gulp.dest(root_path + '/app/'));
});

gulp.task('dev', function(){
	return gulp.src(src_path+'/html/*.html')
		.pipe(gulp.dest(root_path + '/app/'));
});
gulp.task('publish', gulpSequence('clean', 'md5') );
