const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const server = http.createServer((req, res) => {
  const filePath = path.join(conf.root, req.url)

  console.info(filePath, 'file')
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      res.end(`${filePath} is not a directory`)
      return
    }
    if (stats.isFile()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain')
      fs.createReadStream(filePath).pipe(res)
    } else if (stats.isDirectory()) {
      fs.readdir(filePath, (err, files) => {
        if (err) return
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end(files.join(','))
      })
    }
  })
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`server started at ${chalk.green(addr)}`)
})
