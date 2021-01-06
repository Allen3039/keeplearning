const fs = require('fs');
const { resolve } = require('path');

// fs.writeFile('data.json', process.pid + '', { flag: 'w' }, (err) => {
//   console.log('err', err);
// });

// fs.mkdirSync('./dir');

function rm(dirName) {
  const subs = fs.readdirSync(dirName);
  subs.forEach((path) => {
    const status = fs.lstatSync(resolve(dirName, path));
    if (status.isDirectory()) {
      rm(resolve(dirName, path));
    } else {
      fs.unlinkSync(resolve(dirName, path));
    }
  });
  fs.rmdirSync(dirName);
}

rm(resolve(__dirname, './dir'));
