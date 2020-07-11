function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var left = [],
    right = [],
    current = arr.shift();
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element < current) {
      left.push(element);
    } else {
      right.push(element);
    }
  }
  return quickSort(left).concat(current, quickSort(right));
}

// 什么垃圾
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

var sum = 0;
// 全排列
function allOrder(arr, i = 0) {
  if (arr.length == i + 1) {
    sum++;
    console.log(arr);
    return;
  }
  for (let index = i; index < arr.length; index++) {
    swap(arr, i, index);
    allOrder(arr, i + 1);
    swap(arr, index, i);
  }
}
allOrder([1, 2, 3]);

function isR(str) {
  var i = 0,
    l = str.length - 1;

  while (l - i > i) {
    if (str[i] != str[l - i]) {
      return false;
    }
    i++;
  }
  return true;
}

// 红绿灯🚦

function loop() {
  function sleep(t) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, t * 1000);
    });
  }
  async function oneTurn() {
    console.log(new Date());
    console.log('red');
    await sleep(3);
    console.log(new Date());
    console.log('yellow');
    await sleep(1);
    console.log(new Date());
    console.log('green');
    await sleep(1);
    await oneTurn();
  }

  oneTurn();
}

function sort(arr, remain, choose = []) {
  if (remain < 0) {
    return false;
  }
  if (!remain) {
    console.log(choose);
    return choose;
  }
  if (arr.length == 0 && remain) {
    return false;
  }
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    sort(arr.slice(index + 1), remain - element, [...choose, element]);
  }
}

// 数组里面重复的元素
arr = [1, 2, 3, 4, 1, 1, 2, 4, 4];
arr.reduce((pre, cur) => {
  if (!pre[cur]) {
    pre[cur] = 1;
  } else {
    pre[cur] += 1;
  }
  return pre;
}, {});

//nums = [2, 7, 11, 15], target = 9
