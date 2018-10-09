const promisify = require('util').promisify
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const toPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(toPath, 'utf-8')
const handlebars = require('handlebars')
const template = handlebars.compile(source)
// const config = require('../config/default')
const mimeType = require('./mimeType')
const compress = require('./compress')

module.exports = async (filePath, req, res, config) => {
    try {
        const stats = await stat(filePath)
        if (stats.isFile()) {
            const contentType = mimeType(filePath)
            res.setHeader('Content-Type', contentType)
            let rs
            rs = fs.createReadStream(filePath)
            if (filePath.match(config.compress)){
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else {
            const files = await readdir(filePath)
            const dir = path.relative(config.root, filePath)
            const data = {
                dir: dir ? `/${dir}` : '',
                files,
                title: path.extname(filePath)
            }
            res.end(template(data))
        }
    } catch (error) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end(`${error}, ${filePath} is invalid`)
    }
}