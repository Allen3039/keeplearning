// 已知如下数组：
var arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
// 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

function flap(arr) {
  if ([].every.call(arr, (item) => !Array.isArray(item))) {
    return arr;
  }
  return [].reduce.call(
    arr,
    (pre, cur) => {
      if (Array.isArray(cur)) {
        return [].concat(pre, flap(cur));
      } else {
        return [].concat(pre, cur);
      }
    },
    []
  );
}

function flap2(arr) {
  return Array.isArray(arr)
    ? arr.reduce((pre, cur) => {
        return [...pre, ...flap2(cur)];
      }, [])
    : [arr];
}

function removeRepeat(arr) {
  return [...new Set(arr)];
}

function sort(arr) {
  return [].sort.call(arr, (a, b) => a - b);
}

function handle(data, ...fns) {
  return fns.reduce((pre, cur) => {
    return cur(pre);
  }, data);
}

handle(arr, flap, sort, removeRepeat);

// 使用 * 表示这是一个 Generator 函数
// 内部可以通过 yield 暂停代码s
// 通过调用 next 恢复执行
function* test() {
  let a = 1 + 2;
  yield 2;
  yield 3;
}
let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }

function test() {
  var a;
  function cbk(obj) {
    switch ((obj.cur = obj.next)) {
      case 0:
        a = 1 + 2;
        obj.next = 2;
        return 2;
      case 1:
        obj.next = 2;
        return 3;
      case 2:
      default:
        return;
    }
  }
  return generator(cbk);
}

function generator(cbk) {
  return (function() {
    var obj = {
      next: 0,
    };

    return {
      next: function() {
        let res = cbk(obj);
        if (res !== undefined) {
          return { value: res, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  })();
}

let b = test();
console.log(b.next()); // >  { value: 2, done: false }
console.log(b.next()); // >  { value: 3, done: false }
console.log(b.next()); // >  { value: undefined, done: true }

// 加法运算
function sum(a, b) {
  if (a == 0) {
    return b;
  }
  if (b == 0) {
    return a;
  }
  var part1 = a ^ b;
  var part2 = (a & b) << 1;
  return sum(part1, part2);
}

console.assert(sum(1, 2) == 3);
console.assert(sum(11, 21) == 32);
console.assert(sum(0, 2343) == 2343);
console.assert(sum(66, 89) == 155);

function bubbleSort() {}

function instanceOf(leftValue, rightValue) {
  var leftProto = Reflect.getPrototypeOf(leftValue);
  var rightProto = rightValue.prototype;
  while (leftProto) {
    console.log(leftProto);
    if (leftProto === rightProto) {
      return true;
    }
    leftProto = Reflect.getPrototypeOf(leftProto);
  }
  return false;
}

instanceOf(new Date(), Date);
instanceOf(new Date(), Object);

function Person(name, age) {
  this.name = name;
  this.age = age;
  return this;
}
Person.prototype = {
  h() {
    return this.name + this.age;
  },
};

//
function myNew(Func, ...params) {
  var obj = Object.create(Func.prototype);
  var result = Func.apply(obj, params);
  if (typeof result == 'object' && result != null) {
    return result;
  }
  return obj;
}

var wnm = myNew(Person, '王尼玛', 18);
