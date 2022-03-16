const through = require('through2')
const fs = require('fs')
const { Buffer } = require('buffer')

// 拆分模板
function createInsert(bf) {
  const template = fs.readFileSync('./core/template.html')
  const slot = '<slot></slot>'
  const breakpoint = template.indexOf(slot)
  const header = template.slice(0, breakpoint)
  const footer = template.slice(breakpoint + slot.length)
  return bf => Buffer.concat([header, bf, footer])
}

const insert = createInsert()

function makeFile () {
  return through.obj(function (file, enc, cb) {
    file.extname = '.html'
    file.contents = insert(file.contents)
    this.push(file)
    cb()
  })
}

function makeTxt() {
  return through.obj(function (file, enc, cb) {
    file.extname = '.txt'
    let index = file.contents.indexOf('{')
    file.contents = file.contents.slice(index)
    this.push(file)
    cb()
  })
}

exports.makeFile = makeFile
exports.makeTxt = makeTxt