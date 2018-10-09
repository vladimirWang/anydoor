const http = require('http')
const chalk = require('chalk')
const config = require('./config/default.js')
const route = require('./helper/route.js')
const path = require('path')

class Server {
    constructor(conf){
        this.conf = Object.assign({}, config, conf)
    }
    start(){
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.conf.root, req.url)
            route(filePath, req, res, this.conf)
        })
        
        server.listen(this.conf.port, this.conf.host, () => {
            console.log(chalk.green(`http://${this.conf.host}:${this.conf.port}`))
        })
    }
}
module.exports = Server