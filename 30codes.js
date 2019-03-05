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

// 函数节流 : 指定时间间隔只触发一次 比如页面滚动节流
// 函数防抖 : 任务触发的间隔超过指定的时间间隔才执行

function throttle(fn, interval) {
  let running;
  return function() {
    if (running) {
      return;
    }
    running = true;
    setTimeout(() => {
      fn.apply(this, arguments);
      running = false;
    }, interval);
  };
}

function debounce(fn, interval) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, interval);
  };
}

// 将异步函数转为promise
const promisify = func => (...arg) => {
  return new Promise((resolve, reject) => {
    func(...arg, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const delay = promisify((timer, cb) => {
  setTimeout(() => {
    cb(1);
  }, timer);
});

delay(3000).then(() => {
  console.log("resolved after 3s");
});

// chunk array
const chunks = (arr, size) => {
  return Array.from({ length: Math.ceil(arr.length / size) }, (val, i) =>
    [].slice.call(arr, i * size, i * size + size)
  );
};

chunks([1, 2, 3, 4, 5, 6, 7, 8], 3);

// rm falsey values
const filterFalsy = arr => arr.filter(Boolean);
filterFalsy([1, 2, 0, false, "", null]);

const countOccurrences = (arr, predicate) => {
  return arr.reduce((acc, val) => (val === predicate ? acc + 1 : acc), 0);
};
countOccurrences([1, 1, 2, 1, 2, 3], 1);

const deepFlatten = arr => {
  return arr.reduce((acc, val) => {
    if (Array.isArray(val) && val.some(Array.isArray)) {
      return acc.concat(deepFlatten(val));
    }
    return acc.concat(val);
  }, []);
};

deepFlatten([1, [2], [[3], 4], 5]);

const flattern=arr=>arr.reduce((prev,cur)=>(
  prev.concat(Array.isArray(cur)?flattern(cur):cur)
),[]);
flattern([1, [2], [[3], 4], 5]);

// findLast bookmark

// groupBy
const groupBy = (arr, predicate) => {
  return arr
    .map(typeof predicate === "function" ? predicate : val => val[predicate])
    .reduce((acc, val, i) => {
      acc[val] = (acc[val] || []).concat(arr[i]);
      return acc;
    }, {});
};

groupBy([6.1, 4.2, 6.3], Math.floor); // {4: [4.2], 6: [6.1, 6.3]}
groupBy(["one", "two", "three"], "length"); // {3: ['one', 'two'], 5: ['three']}

const initializeArrayWithRange = (end, start = 0, step = 1) => {
  return Array.from({ length: ~~((end - start) / step) + 1 }, (val, k) => {
    return start + k * step;
  });
};
initializeArrayWithRange(5); // [0,1,2,3,4,5]
initializeArrayWithRange(7, 3); // [3,4,5,6,7]
initializeArrayWithRange(9, 0, 2); // [0,2,4,6,8]

const offset = (arr, index) => {
  return [...arr.slice(index), ...arr.slice(0, index)];
};
offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]

const pullAtIndex = (arr, pullArr) => {
  const pulledArr = [];
  const filteredArr = arr.filter((val, index) => {
    if (pullArr.includes(index)) {
      pulledArr.push(val);
      return false;
    }
    return true;
  });
  arr.length = 0;
  for (let val of filteredArr) {
    arr.push(val);
  }
  return pulledArr;
};
let myArray = ["a", "b", "c", "d"];
let pulled = pullAtIndex(myArray, [1, 3]);

const reduceSuccessive = (arr, fn, intial) => {
  return arr.reduce((acc, val) => (acc.push(fn(acc.slice(-1)[0], val)), acc), [
    intial
  ]);
};

reduceSuccessive([1, 2, 3, 4, 5, 6], (acc, val) => acc + val, 0); // [0, 1, 3, 6, 10, 15, 21]

const reduceWhich = (arr, comparator) => {
  return arr.reduce((acc, val) => (comparator(acc, val) > 0 ? val : acc), 0);
};

reduceWhich([1, 3, 2], (a, b) => b - a);

// shuffle
const shuffle = ([...arr]) => {
  let i = arr.length - 1;
  while (i) {
    const index = Math.floor(Math.random() * i);
    [arr[i], arr[index]] = [arr[index], arr[i]];
    i--;
  }
  return arr;
};

const foo = [1, 2, 3];
console.log(shuffle(foo));

// stableSort
const parseRegx = /([#\.]?[a-zA-Z0-9]+)/;
const emmetName = "div.class#id";
emmetName.split(parseRegx);

// 正则parse 元素tag class和id

// 代理反射实现的观察者模式
const queuedObservers = new Set();

const observe = observer => {
  queuedObservers.add(observer);
};

const observable = obj =>
  new Proxy(obj, {
    set: (target, name, value) => {
      Reflect.set(target, name, value);
      queuedObservers.forEach(observer => {
        Reflect.apply(observer, null, target);
      });
    }
  });

const person = observable({
  name: "张三",
  age: 20
});

function print() {
  console.log(`${person.name}, ${person.age}`);
}

observe(print);
person.name = "李四";

// run generator 
function run(gen){
  var args=[].slice.call(arguments,1),it;
  
  it=gen.apply(this,args);

  return Promise.resolve()
      .then(function handleNext(value){
        var next=it.next(value);
        if()
      })
  
}


// 这里通过compose，传入一组函数，将函数通过next参数串联起来，同时可以控制函数调用时prev的值控制compose的执行过程，这个也就是中间件的思路
const makeAdd=(next)=>{
  return (prev)=>{
    
    return next(prev+1);
  }
}
const makeMulti=(next)=>{
  return (prev)=>{
    if(prev>2){
      return prev;
    }
    return next(prev*2);
  }
}

const log=(prev)=>{
  console.log(prev);
}




const compose=(...fns)=>{
  if(fns.length==1){
    return fns[0];
  }

  return fns.reduce((a,b)=>(...args)=>a(b(...args)));
}

composeFn=compose(makeAdd,makeMulti)(log)

// 方便对比 这里也给出了常规compose使用demo
const add1=(val)=>val+1;
const multi2=(val)=>val*2;
composeFn1=compose(add1,multi2)
composeFn1(2)==5