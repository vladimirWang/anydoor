module.exports = {
    port: 9999,
    host: '127.0.0.1',
    root: process.cwd(),
    compress: /\.(html|js|css|md)/,
    cache: {
        cacheControl: true,
        maxAge: 600,
        lastModified: true
    }
}