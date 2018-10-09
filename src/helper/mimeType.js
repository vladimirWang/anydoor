const types= {
    'js': 'text/javascript',
    'html': 'text/html',
    'txt': 'text/plain',
    'css': 'text/css',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg'
}

module.exports = (filePath) => {
    const ext = filePath
        .split('.')
        .pop()
        .toLowerCase()
    if (!ext){
        ext = filePath
    }
    return types[ext] || types['txt']
}