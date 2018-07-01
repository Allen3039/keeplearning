/* 
  随机从数组中取出数据 
  data 数组
  len  随机取出的元素的个数
*/
function randArray(data, len) {
  data.sort(function() {
    return Math.random() - 0.5;
  });
  return data.slice(0, len);
}

/*
 trigger any event of ele by the specified EventName
 
 for instance 
 
 we can't trigger mouseover event like click by click()
 
 fireEvent(btn, 'mouseover');
 
 这是微软IE浏览器用以替代EventTarget.dispatchEvent()的私有方法，
 与EventTarget.dispatchEvent()不同的是通过fireEvent() 触发的事件不会触发事件的默认行为，
 例如，通过fireEvent()触发<input type="checkbox">的点击事件并不会切换checkbox的选中状态
 
 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/fireEvent
*/

function fireEvent(ele, EventName) {
  if (ele != null) {
    if (ele.fireEvent) {
      ele.fireEvent("on" + EventName);
    } else {
      var evObj = document.createEvent("Events");
      evObj.initEvent(EventName, true, false);
      ele.dispatchEvent(evObj);
    }
  }
}

/**
 * 一个节点如果放到文档碎片中，那么就会从页面删除
 * 把节点转成文档碎片并从文档中移出 vue用到了这个方法
 */
function node2Fragment(node, vm) {
  //这里是dom劫持，vue会新建一个文档片段来替换dom中本来的结点
  var flag = document.createDocumentFragment();
  //子节点
  var child;
  while ((child = node.firstChild)) {
    console.log("child:", child);
    //开始编译每个结点
    // compile(child,vm);
    //appendchild方法会自动删除node对象的child结点
    flag.appendChild(child);
  }
  return flag;
}

/**
 *
 * 2018-01-25去阿里面试了，其中有道阿里面试题。。
 * 给一个图片url数组，一个图片下载完毕，在下载另外一个
 */
function loadImageByOrder() {
  let done = false;
  let allDone = false;
  console.log("loadImageByOrder...");
  return function(arr, callback) {
    console.log("闭包函数...", arr);
    if (!arr || !Array.isArray(arr) || !arr.length) return;
    // 过滤出空的或者是null、undefined的值
    arr = arr.filter(url => !!url);
    console.log("闭包函数处理后的arr...", arr);
    function download(url) {
      if (!url) {
        allDone = true;
        return;
      }
      done = false;
      console.log("开始下载" + url);
      const image = new Image();
      image.src = url;
      image.onload = image.error = () => {
        done = true;
        console.log("下载成功" + url);
        callback.call(image, url);
      };
    }
    download(arr.shift());
    const interval = 17;
    const timer = setTimeout(function checker() {
      setTimeout(checker, interval);
      if (!done) return;
      if (allDone) {
        clearTimeout(timer);
        return;
      }
      download(arr.shift());
    }, interval);
  };
}

/**
 * 找出数组中的最小值
 *
 * @param {*} arr
 * @returns
 */
const findMin = arr => {
  return Math.min(...arr);
};

const getUrlParameters = url => {
  const reg = /([^?=&]+)=([^?=&]*)/g;
  return (url.match(reg) || []).reduce((acc, curValue) => {
    const tmp = curValue.split("=");
    acc[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
    return acc;
  }, {});
};

// promise
const promisify = func => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => {
      console.log("err", err);
      err ? reject(err) : resolve(result);
    })
  );

const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log("Hi!"));

// 管道函数 厉害喽
const pipeFuncs = (...fns) => {
  return fns.reduce((f, g) => (...arg) => {
    return g(f(...arg));
  });
};
const add2 = x => x + 2;
const double = x => x * 2;

pipeFuncs(add2, double)(1);
