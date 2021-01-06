const stream = require('stream');
const { Stream } = require('stream');
const { commentBlock } = require('jscodeshift');
const fs = require('fs');

class BuleStream extends Stream.Writable {
  _write(chunk, encoding, cbk) {
    process.stdout.write(`\x1B[34m${chunk}\x1B[39m`);
    cbk();
  }
}

fs.truncate(1);
process.stdin.pipe(new BuleStream());
