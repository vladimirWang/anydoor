const chalk = require('chalk')
const { createGzip, createDeflate } = require('zlib')
module.exports = (rs, req, res) => {
  const acceptEncoding = req.headers['accept-encoding']
  console.info(chalk.red(acceptEncoding), '支持的格式')
  if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
    return rs
  } else if (acceptEncoding.match(/\bgzip\b/)) {
    res.setHeader('Content-Encoding', 'gzip')
    return rs.pipe(createGzip())
  } else if (acceptEncoding.match(/\bdeflate\b/)) {
    res.setHeader('Content-Encoding', 'deflate')
    return rs.pipe(createDeflate())
  }
}
