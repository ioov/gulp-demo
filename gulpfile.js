var path = require('path');
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifycss = require('gulp-minify-css');
var fileconcat = require('gulp-file-concat');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

var root_path = path.resolve(__dirname);
var src_path = path.resolve(root_path, 'src');
var dest_path = path.resolve(root_path, 'dest');

gulp.task('clean', function(){
	return gulp.src(dest_path+'/*/page/*', {read :false})
		.pipe(clean());
});

gulp.task('concat_js', ['clean'], function(){
	return gulp.src( src_path + "/js/page/index.js")
		.pipe(fileconcat({
			relativeUrls: './'
		}))
		.pipe(gulp.dest( dest_path + '/js/page/'));
});

gulp.task('minify_js', ['concat_js'], function(){
	return gulp.src( dest_path + "/js/page/*.js")
		.pipe(uglify())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(rev())
		.pipe(gulp.dest(dest_path + '/js/page/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest( dest_path + '/rev/js'));
});

gulp.task('rev_js', ['minify_js'], function(){
	return gulp.src([dest_path+'/rev/js/*.json', root_path+'/app/*.html'])
		.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
				'/dest/js/': function(manifest_value){
					return 'http://cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot/' + manifest_value;
				}
			}
		}))
		.pipe(gulp.dest(root_path + '/app/'));
});


gulp.task('concat_css', ['clean'], function(){
	return gulp.src( src_path + "/css/page/index.css")
		.pipe(fileconcat({
			relativeUrls: './'
		}))
		.pipe(gulp.dest( dest_path + '/css/page/'));
});

gulp.task('minify_css', ['concat_css'], function(){
	return gulp.src( dest_path + "/css/page/*.css")
		.pipe(minifycss())
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(rev())
		.pipe(gulp.dest(dest_path + '/css/page/'))
		.pipe(rev.manifest())
		.pipe(gulp.dest( dest_path + '/rev/css'));
});

gulp.task('rev_css', ['minify_css'], function(){
	return gulp.src([dest_path+'/rev/css/*.json', root_path+'/app/*.html'])
		.pipe(revCollector({
			replaceReved: true,
			dirReplacements: {
				'/dest/css/': function(manifest_value){
					return 'http://cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot/' + manifest_value;
				}
			}
		}))
		.pipe(gulp.dest(root_path + '/app/'));
});

// gulp.task('dev', ['rev_js', 'rev_css']);
gulp.task('publish', ['rev_js', 'rev_css']);






