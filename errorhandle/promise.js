const p1 = Promise.resolve(1);

const p2 = Promise.resolve(2);

const p3 = Promise.reject(Error('3'));

Promise.all([p3, p1, p2])
  .then((res) => {
    console.log('res', res);
  })
  .catch((err) => {
    console.log('err', err);
  });

Promise.race([p1, p2, p3])
  .then((res) => {
    console.log('res', res);
  })
  .catch((err) => {
    console.log('err', err);
  });

Promise.allSettled([p1, p2, p3])
  .then((res) => {
    console.log('all settled res', res);
  })
  .catch((err) => {
    console.log('settled err', err);
  });
