const fs = require('fs');
const path = require('path');
const mime = require('mime');

module.exports = function (filePath) {
  const fd = fs.openSync(filePath, 'r');
  const stat = fs.fstatSync(fd);
  const cntType = mime.getType(filePath);
  return {
    fd,
    headers: {
      'content-length': stat.size,
      'last-modified': stat.mtime.toUTCString(),
      'content-type': cntType,
    },
  };
};
