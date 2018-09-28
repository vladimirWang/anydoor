const path = require('path')

const mimeTypes = {
  'css': 'text/css',
  'html': 'text/html',
  'jpeg': 'image/jpeg',
  'jpg': 'image/jpeg',
  'js': 'text/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'txt': 'text/plain'
}

module.exports = (filePath) => {
  console.info(filePath, 'filepath')
  let ext = path.extname(filePath)
    .split('.')
    .pop()
    .toLowerCase()
  console.info(ext, ext.length, typeof ext, 'ext')
  if (!ext) {
    ext = filePath
  }
  return mimeTypes[ext] || mimeTypes['txt']
}
