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
  browerSync = require('browser-sync').create(),
  reload = browerSync.reload,
  Config = require('./gulpfile.config.js');
// ======= gulp dev 开发环境下 ===============
function dev () {
  /**
   *  html处理
   * */
  gulp.task('html:dev', function () {
    return gulp.src(Config.html.src).pipe(gulp.dest(Config.html.dist)).pipe(reload({ stream: true }));
  });

  /**
   * assets文件夹下所有文件处理
   */
  gulp.task('assets:dev', function () {
    return gulp.src(Config.assets.src).pipe(gulp.dest(Config.assets.dist)).pipe(reload({ stream: true }));
  });
  /**
   * css文件处理
   */
  gulp.task('css:dev', function () {
    return gulp.src(Config.css.src).pipe(gulp.dest(Config.css.dist)).pipe(reload({ stream: true }));
  });
  /**
   * sass文件处理
   */
  gulp.task('sass:dev', function () {
    return gulp.src(Config.sass.src).pipe(sass()).pipe(rev()).pipe(gulp.dest(Config.sass.dist)).pipe(rev.manifest()).pipe(gulp.dest('./rev/css')).pipe(reload({ stream: true }));
  });
  
  /**
   * js 文件处理
   */
  // gulp.task('js:dev', function() {
  //   return gulp.src(Config.js.src).pipe(jshint('.jshintrc')).pipe(jshint.reporter('default')).pipe(gulp.dest(Config.js.dist)).pipe(reload({ stream: true }))
  // })
  gulp.task('js-combo:dev', function () {
    return gulp.src(Config.js_combo)
      .pipe(combo({ignore: ['jquery']}))
      .pipe(rev()).pipe(gulp.dest(Config.js.dist))
      .pipe(rev.manifest()) // - 生成一个rev-manifest.json
      .pipe(gulp.dest('./rev/js'))
      .pipe(reload({ stream: true }));
  });
  /**
   * 文件添加版本号
   */
  gulp.task('rev:dev', function () {
    gulp.src(['./rev/**/*.json', Config.html.src])
      // - 读取 rev-manifest.json 文件以及需要进行文件名替换的文件
      .pipe(revCollector({
        replaceReved: true,
        dirReplacements: {
          'css': 'css',
          'js/': 'js'
        }
      }))
      // - 执行文件内文件名的替换
      .pipe(gulp.dest(Config.dist));
  // - 替换后的文件输出的目录
  });
  gulp.task('js-config:dev',function(){
    return gulp.src(Config.src+'*.js').pipe(gulp.dest(Config.dist)).pipe(reload({ stream: true }))
  })
  /**
   * img图片处理
   */
  // gulp.task('images:dev', function () {
  //   return gulp.src(Config.img.src).pipe(imagemin({
  //     optimizationLevel: 3,
  //     progressive: true,
  //     interlaced: true
  //   })).pipe(gulp.dest(Config.img.dist)).pipe(reload({ stream: true }));
  // });
  // 雪碧图
  gulp.task('images:dev',function(){
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
      .pipe(gulp.dest(Config.img.dist)).pipe(reload({ stream: true }));
  });
  gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'assets:dev', 'images:dev', 'js-combo:dev', 'rev:dev','js-config:dev'], function () {
    browerSync.init({
      server: {
        baseDir: [Config.dist, Config.src],
        index: 'index.html'
      },
      notify: false
    });
    gulp.watch(Config.html.src, ['html:dev']);
    gulp.watch(Config.css.src, ['sass:dev']);
    gulp.watch(Config.js.src, ['js-combo:dev']);
    gulp.watch(Config.img.src, ['img:dev']);
    gulp.watch(Config.assets.src, ['assets:dev']);
    // gulp.watch(Config.css.src, ['css:dev']);
    // gulp.watch(Config.js.src, ['js-src:dev']);
  });
}
// ======= gulp dev 开发环境下 ===============
module.exports = dev;
