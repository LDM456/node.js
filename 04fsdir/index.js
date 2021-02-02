let fs = require('fs');
let { fsWrite, fsRead } = require('./units')

const txtpath = 'all.txt';
fs.readdir('../03fs', function(err, files) {
    if (err) {
        console.log(err);
    } else {
        console.log(files);
        files.forEach(async function(fileName, i) {
            let content = await fsRead('../03fs/' + fileName);
            await fsWrite(txtpath, content)
        })
    }
})