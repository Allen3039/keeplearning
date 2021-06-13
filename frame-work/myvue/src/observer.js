import Dep from "./dep.js";

/**
 * 让数据get set 都可被观察到
 * 好做依赖收集 和 更新事件通知
 */
export default class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    Object.keys(data).forEach((k) => {
      defineReactive(data, k);
    });
  }
}

function defineReactive(data, key) {
  const dep = new Dep();
  dep.key = key;
  let val = data[key];
  Object.defineProperty(data, key, {
    get() {
        console.log("访问" + key);
      if (Dep.target) {
        dep.depend(Dep.target);
    }
    console.log("get -> dep", dep);
      return val;
    },
    set(newVal) {
      if (newVal === val) {
        return;
      }
      val = newVal;
      dep.notify();
    },
  });
}
