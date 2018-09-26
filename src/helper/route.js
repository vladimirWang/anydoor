const fs = require('fs')
const handleBars = require('handlebars')
const promisify = require('util').promisify
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const path = require('path')
const config = require('../config/defaultConfig')
const toPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(toPath, 'utf-8')
const template = handleBars.compile(source)

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath)
      console.info(files, 'files')
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      const dir = path.relative(config.root, filePath)
      const data = {
        files,
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : ''
      }
      res.end(template(data))
    }
  } catch (err) {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`${filePath} is not a directory`)
  }
}
