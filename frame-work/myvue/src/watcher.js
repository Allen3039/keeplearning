import Dep from "./dep.js";

/**
 * 手动触发一次依赖收集，并将自己作为当前的订阅者传递出去
 */
export default class Watcher {
  constructor(fn) {
    this.getter = fn;
    this.get();
  }

  get() {
    Dep.target = this;
    this.getter();
    Dep.target = null;
  }

  update() {
    console.count("更新");
    this.getter();
  }
}
