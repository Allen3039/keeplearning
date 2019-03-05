function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step('next', value);
            },
            function(err) {
              step('throw', err);
            }
          );
        }
      }
      return step('next');
    });
  };
}

function run(gen) {
  var args = [].slice.call(arguments, 1),
    it;
  // 在当前上下文中初始化生成器
  it = gen.apply(this, args);
  // 返回一个promise用于生成器完成
  return Promise.resolve().then(function handleNext(value) {
    // 对下一个yield出的值运行
    var next = it.next(value);
    return (function handleResult(next) {
      // 生成器运行完毕了吗?
      if (next.done) {
        return next.value;
      }
      // 否则继续运行
      else {
        return Promise.resolve(next.value).then();
      }
    })(next);
  });
}

//example
function* main() {
  yield 1;
  yield 2;
}

run(main);

function* foo() {
  try {
    const xx = yield 'B';
    console.log('xx', xx);
  } catch (err) {
    console.log('error caught inside *foo():', err);
  }
  yield 'C';
  yield 'c1';
  throw 'D';
}

function* bar() {
  yield 'A';
  try {
    yield* foo();
  } catch (err) {
    console.log('error caught inside *bar():', err);
  }
  yield 'E';
  yield* baz();
  // 注:不会到达这里!
  yield 'G';
}

function* foo(val) {
  if (val > 1) {
    // 生成器递归
    val = yield* foo(val - 1);
  }
  console.log(val);
  return yield val;
}
function* bar() {
  var r1 = yield* foo(3);
  console.log(r1);
}
run(bar);

function* baz() {
  throw 'F';
}

var it = bar();
console.log('outside:', it.next().value); // outside: A
console.log('outside:', it.next(1).value); // outside: B
console.log('outside:', it.next(2).value); // error caught inside *foo(): 2
// outside: C
console.log('outside:', it.throw(3).value);
