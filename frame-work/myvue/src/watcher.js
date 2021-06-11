import Dep from "./dep.js";

/**
 * 手动触发一次依赖收集，并将自己作为当前的订阅者传递出去
 */
export default class Watcher {
  constructor(fn) {
    this.getter = fn;
    this.depIds = [];
    this.newDepIds = [];
    this.newDepSet = new Set();
    this.depSet = new Set();
    this.get();
  }

  get() {
    Dep.target = this;
    this.getter();
    Dep.target = null;
    this.cleanupDeps();
  }

  addDep(dep) {
    const id = dep.id;
    if (this.newDepIds.includes(id)) {
      return;
    }
    this.newDepIds.push(id);
    this.newDepSet.add(dep);
    if (!this.depSet.has(dep)) {
      dep.addSub(this);
    }
  }

  update() {
    console.count("更新");
    this.get();
  }

  cleanupDeps() {
    // this.depIds.forEach();
    this.depSet.forEach((dep) => {
      if (!this.newDepSet.has(dep)) {
        dep.removeSub(this);
      }
    });
    this.depIds = this.newDepIds;
    this.newDepIds = [];
    console.log("Watcher -> cleanupDeps -> this.depIds", this.depIds);

    this.depSet.clear();
    this.depSet = this.newDepSet;
    console.log("Watcher -> cleanupDeps -> this.depSet", this.depSet);
    this.newDepSet = new Set();
  }
}
