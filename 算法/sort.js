/**
 *
 * @param {array} arr
 */
function insertSort(arr = []) {
  if (arr.length <= 1) return arr;
  for (var i = 1; i < arr.length; i++) {
    var val = arr[i];
    for (var j = i - 1; j >= 0; j--) {
      if (arr[j] < val) break;
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = val;
  }
  return arr;
}

var arr = [1, 2, 3, 4, , 5, 6];

insertSort([1, 2, 3, 4, 5, 6].sort(() => Math.random() - 0.5));

function mergeSort(arr) {
  if (arr.length === 1) {
    return arr;
  }
  const part1 = arr.slice(0, Math.floor(arr.length / 2));
  const part2 = arr.slice(Math.floor(arr.length / 2));
  // merge 排序结果
  return merge(mergeSort(part1), mergeSort(part2));
}

function merge(arr1, arr2) {
  const arrFinal = [];
  let i = 0,
    j = 0,
    k = 0;
  while (i < arr1.length || j < arr2.length) {
    console.log({ i, j });
    if (arr1[i] === undefined) {
      arrFinal[k] = arr2[j];
      j++;
      k++;
      continue;
    }
    if (arr2[j] === undefined) {
      arrFinal[k] = arr1[i];
      i++;
      k++;
      continue;
    }
    if (arr1[i] <= arr2[j]) {
      arrFinal[k] = arr1[i];
      i++;
      k++;
      continue;
    }
    if (arr1[i] > arr2[j]) {
      arrFinal[k] = arr2[j];
      j++;
      k++;
      continue;
    }
  }
  return arrFinal;
}

function quickSort(arr) {
  if (arr.length == 1 || arr.length == 0) {
    return arr;
  }
  let i = 0,
    j = 0;
  const pivot = arr[arr.length - 1];
  for (; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      j++;
    }
  }
  arr[arr.length - 1] = arr[j];
  arr[j] = pivot;
  // 三段
  return [...quickSort(arr.slice(0, j)), pivot, ...quickSort(arr.slice(j + 1))];
}

// not ready
function quickSort2(arr) {
  if (arr.length == 1 || arr.length == 0) {
    return arr;
  }
  let i = 0,
    j = arr.length - 2; // 后面指针
  const pivot = arr[arr.length - 1];
  for (; i < j; ) {
    if (arr[i] > pivot && arr[j] < pivot) {
      [arr[j], arr[i]] = [arr[i], arr[j]];
      i++;
      j--;
      continue;
    }
    if (arr[i] < pivot) {
      i++;
      continue;
    }
    if (arr[j] > pivot) {
      j--;
      continue;
    }
  }
  arr[arr.length - 1] = arr[i + 1];
  arr[i + 1] = pivot;
  // 三段
  return [
    ...quickSort2(arr.slice(0, i + 1)),
    pivot,
    ...quickSort2(arr.slice(i + 1 + 1)),
  ];
}

function sqrt(n, delta = 0.0001) {
  var low = 0,
    high = n;
  var mid;
  while (((mid = (low + high) / 2), Math.abs(n - mid ** 2) > delta)) {
    if (n - mid ** 2 > 0) {
      low = mid;
    } else {
      high = mid;
    }
  }
  return mid;
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  var low = 0;
  var high = nums.length - 1;
  if (nums.length === 0) {
    return -1;
  }
  if (nums.length === 1) {
    return nums[0] === target ? 0 : -1;
  }
  var middle = low + ((high - low) >> 1);
  while (low <= high) {
    // console.log({ low, high });
    if (nums[middle] < target) {
      if (nums[low] < nums[middle]) {
        low = middle + 1;
      } else {
        if (nums[high] >= target) {
          low = middle + 1;
        } else {
          high = middle - 1;
        }
      }
    } else if (nums[middle] > target) {
      if (nums[low] < nums[middle]) {
        if (nums[low] <= target) {
          high = middle - 1;
        } else {
          low = middle + 1;
        }
      } else {
        high = middle - 1;
      }
    } else {
      return middle;
    }
    middle = low + ((high - low) >> 1);
  }
  return -1;
};

const b = 1;
const a = { b };
export const aa = {};
