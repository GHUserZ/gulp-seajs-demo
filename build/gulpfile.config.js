var SRC_DIR = './src/'; // 源文件目录
var DIST_DIR = './dist/'; // 文件处理后存放目录
var DIST_FILES = DIST_DIR + '**'; // 目标路径下的所有文件

var Config = {
  src: SRC_DIR,
  dist: DIST_DIR,
  dist_files: DIST_FILES,
  js_combo: SRC_DIR + 'js/main.js',
  html: {
    dir: SRC_DIR,
    src: SRC_DIR + '*.html',
    dist: DIST_DIR
  },
  assets: {
    dir: SRC_DIR + 'assets',
    src: SRC_DIR + 'assets/**/*', // assets目录：./src/assets
    dist: DIST_DIR + 'assets' // assets文件build后存放的目录：./dist/assets
  },
  js: {
    dir: SRC_DIR + 'js',
    src: SRC_DIR + 'js/**/*.js', // js目录：./src/js/  
    dist: DIST_DIR + 'js', // js文件build后存放的目录：./dist/js
    build_name: 'build.js', // 合并后的js文件
  },
  css: {
    dir: SRC_DIR + 'css',
    src: SRC_DIR + 'css/**/*.css', // css目录：./src/css/  
    dist: DIST_DIR + 'css' // css文件build后存放的目录：./dist/css
  },
  sass: {
    dir: SRC_DIR + 'sass',
    src: SRC_DIR + 'sass/**/*.scss', // sass目录：./src/sass/  
    dist: DIST_DIR + 'css' // sass文件build后存放的目录：./dist/css
  },
  img: {
    dir: SRC_DIR + 'images',
    src: SRC_DIR + 'images/**/*.*', // images目录：./src/sass/  
    dist: DIST_DIR + 'images', // img文件build后存放的目录：./dist/images
    sprite:'../images/sprite.png'
  }
}

module.exports = Config;
