// cnpm install --save-dev gulp gulp-autoprefixer gulp-rename gulp-cssnano gulp-sass gulp-jshint gulp-uglify gulp-concat gulp-imagemin browser-sync  mkdirp gulp-rev gulp-rev-collector 
// npm install rimraf -g gulp.spritesmith
var gulp = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀  
  rename = require('gulp-rename'), // 重命名  
  cssnano = require('gulp-cssnano'), // css的层级压缩合并
  jshint = require('gulp-jshint'), // js检查 
  sass = require('gulp-sass'), // sass  
  uglify = require('gulp-uglify'), // js压缩
  concat = require('gulp-concat'), // 合并文件  
  imagemin = require('gulp-imagemin'), // 图片压缩 
  combo = require('gulp-seajs-combo'), // 合并js模块文件
  rev = require('gulp-rev'), // js更改为新的文件名
  spritesmith = require('gulp.spritesmith'),//雪碧图
  revCollector = require('gulp-rev-collector'),
  Config = require('./gulpfile.config.js');

//======= gulp build 打包资源 ===============
function prod() {
  /**
   * html处理
   */
  gulp.task('html', function() {
    return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist));
  });
  /**
   * assets处理
   */
  gulp.task('assets', function() {
    return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist));
  });
  /**
   * CSS样式处理 
   */
  gulp.task('css', function() {
    return gulp.src(Config.css.src).pipe(autoprefixer('last 2 version')).pipe(gulp.dest(Config.css.dist)).pipe(cssnano()).pipe(gulp.dest(Config.css.dist));
  });
  /**
   * sass处理
   */
  gulp.task('sass', function() {
    return gulp.src(Config.sass.src).pipe(autoprefixer('last 2 version')).pipe(sass()).pipe(rev()).pipe(cssnano()).pipe(gulp.dest(Config.css.dist)).pipe(rev.manifest()).pipe(gulp.dest('./rev/css'));
  });

  /**
   * js处理
   */
  // gulp.task('js', function() {
  //   return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(rename({ suffix: '.min' })).pipe(uglify()).pipe(gulp.dest(Config.js.dist));
  // });
  gulp.task('js-combo',function(){
    return gulp.src(Config.js_combo).pipe(combo({ignore:['jquery']})).pipe(rev()).pipe(gulp.dest(Config.js.dist)).pipe(rev.manifest()).pipe(gulp.dest('./rev/js'));
  });
   /**
   * 文件添加版本号
   */
    gulp.task('rev',function(){
      return gulp.src(['./rev/**/*.json',Config.html.src]).pipe(revCollector({
        replaceReved:true,
        dirReplacements: {
          'css':'css',
          'js/':'js'
        }
      })).pipe(gulp.dest(Config.dist));
    });
    gulp.task('js-config',function(){
      return gulp.src(Config.src+'*.js').pipe(gulp.dest(Config.dist));
    });
  /**
   * js合并
   */
  // gulp.task('js-concat', function() {
  //   return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(concat(Config.js.build_name)).pipe(gulp.dest(Config.js.dist)).pipe(rename({ suffix: '.min' }))
  //     .pipe(uglify()).pipe(gulp.dest(Config.js.dist));
  // });
  /**
   * 图片处理
   */
  // gulp.task('images', function() {
  //   return gulp.src(Config.img.src).pipe(imagemin({
  //     optimizationLevel: 3,
  //     progressive: true,
  //     interlaced: true
  //   })).pipe(gulp.dest(Config.img.dist));
  // });
  // 雪碧图
  gulp.task('sprite',function(){
    return gulp.src(Config.img.src)
      .pipe(spritesmith({
        imgName:'sprite.png',     //sprite图名称
        cssName:'../css/sprite.css',   //输出css
        padding:2,        //间距
        algorithm:'binary-tree',   //排列方式
        cssTemplate:function(data){
          var arr=[];
          data.sprites.forEach(function(sprite){
              arr.push(".icon-"+sprite.name+
                    "{" +
                    "background-image: url("+Config.img.sprite+");"+
                    "background-position: "+sprite.px.offset_x+" "+sprite.px.offset_y+";"+
                    "width:"+sprite.px.width+";"+
                    "height:"+sprite.px.height+";"+
                    "}");
          });
          return arr.join("");
        }
      }))
      .pipe(gulp.dest(Config.img.dist));
  });
  // gulp.task('build', ['html', 'assets', 'css', 'sass', 'js', 'images','js-concat']);
  gulp.task('build', ['html', 'assets', 'sass', 'js-combo', 'sprite','js-config','rev']);
};
module.exports = prod;