Promise.resolve().then(() => console.log('p1'));
new Promise(() => {
  throw new Error('just an error');
});
Promise.resolve().then(() => {
  console.log('p2');
  process.nextTick(() => {
    console.log('t3');
    Promise.resolve().then(() => console.log('p3'));
  });
});
// process.on('unhandledRejection', (e) => {
//   console.log('unhandledRejection', e);
// });

setTimeout(() => {
  console.log('timer');
}, 10000);

process.emitWarning(new Error('fku'));
