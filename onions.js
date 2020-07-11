class Onion {
  middles = [];
  index = 0;
  use(cbk) {
    this.middles.push(cbk);
  }

  call(context) {
    var middles = this.middles;

    function _dispatch(i) {
      var fn = middles[i];
      if (!fn) return Promise.resolve();
      return Promise.resolve(
        fn(context, function() {
          _dispatch(i + 1);
        })
      );
    }
    _dispatch(0);
  }
}

let onionIns = new Onion();
onionIns.use(async function(context, next) {
  console.log(1);
  await next();
  console.log(6);
});

onionIns.use(async function(context, next) {
  console.log(2);
  await next();
  console.log(5);
});
onionIns.use(async function(context, next) {
  console.log(3);
  next();
  console.log(4);
});
