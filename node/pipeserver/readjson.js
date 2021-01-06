// const fs = require('fs');
// // Buffer.alloc().to;
// fs.createReadStream('./json.json')
//   .on('data', (buffer) => {
//     console.log(buffer.toString());
//   })
//   .on('end', () => {
//     console.log('read buffer end');
//   });

function flow(...funcs) {
  return funcs.reverse().reduce(
    (inner, outter) => {
      return (res) => outter(res, inner);
    },
    (n) => {
      console.log('last:' + n);
    }
  );
}

flow(
  ...[
    (n, next) => {
      console.log(11);
      n += 1;
      next(n);
    },
    (n, next) => {
      console.log(22);
      n += 2;
      next(n);
    },
    (n, next) => {
      console.log(33);
      n += 3;
      next(n);
    },
  ]
)(0);
