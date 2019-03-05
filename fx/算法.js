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
