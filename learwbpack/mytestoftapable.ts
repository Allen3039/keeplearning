const { AsyncParallelBailHook } = require('tapable');

const h = new AsyncParallelBailHook(['data', 'xx']);
console.time('hook');
h.tapAsync('after 2 seconds call', (data, xx, cbk) => {
  setTimeout(() => {
    console.log('data 2', data);
    console.log('xx 2', xx);
    console.log('call after 2 ');
    cbk(222);
  }, 2000);
});

h.tapAsync('after 1 seconds call', (data, xx, cbk) => {
  setTimeout(() => {
    console.log('data 1', data);
    console.log('xx 1', xx);
    console.log('call after 1 ');
    cbk(111);
  }, 300);
});

h.callAsync('test', 'xx', (err) => {
  console.log('err', err);

  console.timeEnd('hook');
});
