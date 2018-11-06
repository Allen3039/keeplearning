var i, word;
var text = 'A number of W3C';
var words = text.toLowerCase().split(/[\s,.]/);
var count = {};
for (i = 0; i < words.length; i += 1) {
  word = words[i];
  if (count[word]) {
    count[word] += 1;
  } else {
    count[word] = 1;
  }
}

// logic 分段
const a = 1,
  b = 2,
  c = 3;

if ((a + b > c && a - b < 3) || a + c > b) {
  console.log('yoo');
}

if (false);
{
  console.log(1);
}

var a = (b = c = d = 1);

function Effect(f) {
  return {
    get: () => f,
    run: x => f(x),
    map: g => Effect(x => g(f(x))),
  };
}

const fTimeStr = () => {
  const dateStr = new Date().toJSON();
  console.log(dateStr);
  return dateStr;
};
const getTimeArr = str => {
  const reg = /(\d{4})-(\d{2})-(\d{2}).*/;
  return reg.exec(str);
};
const spliceArr = arr => {
  return arr.slice(1, 4).join('-');
};

Effect(fTimeStr)
  .map(getTimeArr)
  .map(spliceArr)
  .run();

// curry
function foo(a, b, c) {
  return a + b + c;
}

let curry = f => arg => (f.length > 1 ? curry(f.bind(null, arg)) : f(arg));

curry(foo)(1)(2)(3);

// aa
// bbb
// cc
// dd
//eee
