const stream = require('stream');
const fs = require('fs');
const util = require('util');

class JSONLineReader extends stream.Readable {
  constructor(source) {
    super();
    this._source = source;
    this._foundLineEnd = false;
    this._buffer = '';

    // this.read();
  }

  // 所有定制 stream.Readable 类都需要实现 _read 方法
  _read(size) {
    let chunk;
    let line;
    let result;

    if (this._buffer.length === 0) {
      chunk = this._source.read();
      this._buffer += chunk;
    }
    console.log('JSONLineReader -> _read -> this._buffer', this._buffer);

    const lineIndex = this._buffer.indexOf('\n');
    console.log('JSONLineReader -> _read -> lineIndex', lineIndex);

    if (lineIndex !== -1) {
      line = this._buffer.slice(0, lineIndex); // 从 buffer 的开始截取第一行来获取一些文本进行解析
      console.log('JSONLineReader -> _read -> line', line);
      if (line) {
        result = JSON.parse(line);
        this._buffer = this._buffer.slice(lineIndex + 1);
        this.push(line);
        // this.emit('object', result); // 当一个 JSON 记录解析出来的时候，触发一个 object 事件
        // this.push(util.inspect(result)); // 将解析好的 SJON 发回内部队列
      } else {
        this.push(null);
      }
    }
  }
}

const input = fs.createReadStream(`${__dirname}/json-lines.txt`, {
  encoding: 'utf8',
});
input.on('readable', () => {
  const jsonLineReader = new JSONLineReader(input); // 创建一个 JSONLineReader 实例，传递一个文件流给它处理

  jsonLineReader.on('data', (d) => {
    console.log('d', d.toString());
  });
});
return;
jsonLineReader.on('object', (obj) => {
  console.log('pos:', obj.position, '- letter:', obj.letter);
});

let jsonOut = stream.Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    console.log(chunk);
    callback();
  },
});
