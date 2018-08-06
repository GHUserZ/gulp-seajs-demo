// cnpm install --save-dev gulp gulp-autoprefixer gulp-rename gulp-cssnano gulp-sass gulp-jshint jshint gulp-uglify gulp-concat gulp-imagemin browser-sync mkdirp
//npm install rimraf -g

var gulp = require('gulp'),
  mkdirp = require('mkdirp'),
  Config = require('./gulpfile.config');
//======= gulp init 初始化项目结构 ===============
function init() {
  gulp.task('init', function() {
    /** 
     * 初始化项目结构
     */
    var dirs = [Config.html.dir, Config.assets.dir, Config.js.dir, Config.css.dir, Config.sass.dir, Config.img.dir];
    dirs.forEach(dir => {
      mkdirp.sync(dir);
    });
  });
};

module.exports = init;