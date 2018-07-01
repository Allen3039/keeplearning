// 尾递归测试 求阶乘
const fc = (acc, index) => {
  if (index === 0) {
    return acc;
  } else {
    return fc(acc * index, index - 1);
  }
};

console.log(1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 * 10);

console.log(fc(1, 10));

// 法1
const reverseStr = str => {
  const actualReverse = (str, index, acc) => {
    if (str.length == index) {
      return acc;
    }
    return actualReverse(str, index + 1, str[index] + acc);
  };
  return actualReverse(str, 0, "");
};

// 法2
// const reverseStr = acc => {
//   if (acc.length === 1) {
//     return acc;
//   }
//   return reverseStr(acc.slice(1)) + acc[0];
// };

console.log(reverseStr("12345678"));

console.log(reverseStr("a"));
