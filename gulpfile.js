
 /**
 * 1.less的编译，压缩，合并
 * 2.js的混淆，压缩，合并
 * 3.img的复制
 * 4.html的压缩
 */
const { src,dest,watch,series,parallel} = require('gulp'); //// https://gulpjs.com/docs/en/getting-started/quick-start
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var concat = require("gulp-concat")
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();//https://browsersync.io/docs/options#option-watch
var cleanDest = require('gulp-clean-dest'); //https://www.npmjs.com/package/gulp-clean-dest


//1.less的编译，压缩，合并,这里没有合并，因为用了less，预处理已经可以导包了
function style(){
	return src(['src/styles/*.less'])
	.pipe(cleanDest('dist/styles'))
	.pipe(less())
	.pipe(minifyCSS())
	.pipe(dest('dist/styles'))
}

//2.js的混淆，压缩，合并
function script(){
	return src('src/scripts/*.js')  
	.pipe(concat('all.js'))
	.pipe(cleanDest('dist/scripts'))
	.pipe(uglify())
	.pipe(dest('dist/scripts'))
}

//3.img的复制
function image(){
	return src('src/images/*.*')
	.pipe(cleanDest('dist/images'))
	.pipe(dest('dist/images'));
}

//4.html的压缩
function html(){
	return src('src/*.html')
	.pipe(cleanDest('dist/'))
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(dest('dist/'));
}
//测试http服务器
function init(){
	browserSync.init({
	    notify: false,
	    port: 2019,
	    watch: true,
	    server: {
	      baseDir: ['dist/']
	    }
  	});
}



//watch files
function watchall(){
	watch('src/styles/*.less',style);
	watch('src/scripts/*.js',script);
	watch('src/images/*.*',image);
	watch('src/*.html',html);
}

exports.default = series(style,script,image,html,init);
exports.serve = watchall;

