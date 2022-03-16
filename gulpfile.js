const { watch, series, src, dest, parallel } = require('gulp')
const connect = require('gulp-connect')
const { makeFile, makeTxt } = require('./core/makeFile.js')

function defaultTask(cb) {
  console.log('请选择一个模式！')
  cb();
}

// 文件转换
function transform() {
  return src('src/*.js')
    .pipe(makeTxt())
    .pipe(dest('txt/'))
    .pipe(makeFile())
    .pipe(dest('dist/'))
    .pipe(connect.reload())
}

// 开发服务
function app() {
  return connect.server({
    port: 8888,
    root: 'dist',
    livereload: true
  })
}

// 监听文件变化
function watchFile() {
  // 可优化，只进行修改文件的transform
  return watch('src/*.js', { ignoreInitial: true }, series(transform))
}

exports.default = defaultTask

// mock 模式
exports.mock = series(transform, parallel(watchFile, app))