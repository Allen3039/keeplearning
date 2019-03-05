const R = require('ramda');

var tasks = [
  {
    username: 'Michael',
    title: 'Curry stray functions',
    dueDate: '2014-05-06',
    complete: true,
    effort: 'low',
    priority: 'low',
  },
  {
    username: 'Scott',
    title: 'Add `fork` function',
    dueDate: '2014-05-14',
    complete: true,
    effort: 'low',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Write intro doc',
    dueDate: '2014-05-16',
    complete: true,
    effort: 'low',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Add modulo function',
    dueDate: '2014-05-17',
    complete: false,
    effort: 'low',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Separating generators',
    dueDate: '2014-05-24',
    complete: false,
    effort: 'medium',
    priority: 'medium',
  },
  {
    username: 'Scott',
    title: 'Fold algebra branch back in',
    dueDate: '2014-06-01',
    complete: false,
    effort: 'low',
    priority: 'low',
  },
  {
    username: 'Scott',
    title: 'Fix `and`/`or`/`not`',
    dueDate: '2014-06-05',
    complete: false,
    effort: 'low',
    priority: 'low',
  },
  {
    username: 'Michael',
    title: 'Types infrastucture',
    dueDate: '2014-06-06',
    complete: false,
    effort: 'medium',
    priority: 'high',
  },
  {
    username: 'Scott',
    title: 'Add `mapObj`',
    dueDate: '2014-06-09',
    complete: false,
    effort: 'low',
    priority: 'medium',
  },
  {
    username: 'Scott',
    title: 'Write using doc',
    dueDate: '2014-06-11',
    complete: false,
    effort: 'medium',
    priority: 'high',
  },
  {
    username: 'Michael',
    title: 'Finish algebraic types',
    dueDate: '2014-06-15',
    complete: false,
    effort: 'high',
    priority: 'high',
  },
  {
    username: 'Scott',
    title: 'Determine versioning scheme',
    dueDate: '2014-06-15',
    complete: false,
    effort: 'low',
    priority: 'medium',
  },
  {
    username: 'Michael',
    title: 'Integrate types with main code',
    dueDate: '2014-06-22',
    complete: false,
    effort: 'medium',
    priority: 'high',
  },
  {
    username: 'Richard',
    title: 'API documentation',
    dueDate: '2014-06-22',
    complete: false,
    effort: 'high',
    priority: 'medium',
  },
  {
    username: 'Scott',
    title: 'Complete build system',
    dueDate: '2014-06-22',
    complete: false,
    effort: 'medium',
    priority: 'high',
  },
  {
    username: 'Richard',
    title: 'Overview documentation',
    dueDate: '2014-06-25',
    complete: false,
    effort: 'medium',
    priority: 'high',
  },
];

var groupByUser = R.groupBy(R.prop('username'));

// const res = groupByUser(tasks);
const res = R.compose(
  groupByUser,
  R.filter(R.where({ complete: R.equals(true) }))
)(tasks);
console.log(res);

let a = {
  a: 1,
  b: 2,
};

console.log(R.dissoc('a', a));

console.log(R.binary.toString());

var takesThreeArgs = function(a, b, c) {
  return [a, b, c];
};
takesThreeArgs.length; //=> 3
takesThreeArgs(1, 2, 3); //=> [1, 2, 3]

var takesTwoArgs = R.binary(takesThreeArgs);
takesTwoArgs.length; //=> 2
// Only 2 arguments are passed to the wrapped function
takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
R.tap(console.log, 1);

const gt20 = R.gt(R.__, 20);
const lt30 = R.lt(R.__, 30);

const f = R.both(gt20, lt30);
R.tap(R.bind(console.log, console))(f(25));
R.pipe(
  f,
  R.tap(R.bind(console.log, console))
)(40);

const obj = {
  a: 1,
  b: 2,
  f() {
    return 3;
  },
};
const sumWithProp = R.converge(R.add, [R.props('a'), R.props('b')]);
console.log(sumWithProp(obj));

console.log(R.clone(obj));

// var byAge = R.comparator((a, b) => a.age < b.age);
var byAge = (a, b) => a.age - b.age;
var people = [{ age: 1 }, { age: 3 }, { age: 2 }];
var peopleByIncreasingAge = R.sort(byAge, people);

console.log('====================================');
console.log(peopleByIncreasingAge);
console.log('====================================');

console.log(R.invoker(0, 'f')(obj));

console.log(R.defaultTo('nima')());

var array1 = [
  {
    id: 1,
    a: 1,
    b: 1,
  },
  {
    id: 2,
    a: 2,
    b: 2,
  },
];
var array2 = R.clone(array1);
array2[1].b = 3;
array2[2] = {
  id: 3,
  a: 3,
  b: 3,
};

console.log(
  R.differenceWith((a, b) => a.b == b.b && a.id == b.id)(array2, array1)
);

var half = R.divide(R.__, 2);
console.log(half(100));

var isOdd = x => x % 2 === 1;
var firstOddTransducer = R.compose(
  R.filter(isOdd),
  R.take(1)
);

R.forEachObjIndexed((val, key) => {
  console.log(`${key}:${val}`);
})(obj);

var str = 'dsadfd,,.,/fdf,/.dfd';
console.log(
  R.pipe(
    R.groupBy((a, b) => {
      var reg = /[a-z]/;
      return reg.test(a) ? 'str' : 'token';
    }),
    R.evolve({
      str: R.join('-'),
      token: R.join(''),
    })
  )(str)
);

console.log(R.indexBy(R.prop('id'))(array1));

var bb = {
  slice() {
    return 2;
  },
};

console.log(R.tail(bb));

console.log(
  R.unfold(n => {
    return n > 10 ? false : [n, n + 1];
  })(0)
);

const getStateCode = R.compose(
  R.prop('state'),
  R.prop('address'),
  R.prop('user')
);

console.log(getStateCode({ user: { address: { state: 'ny' } } }));

console.log(R.composeK);
