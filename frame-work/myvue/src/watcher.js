import Dep, { popTarget, pushTarget } from "./dep.js";

const queue=[];
let flushing=false;
function resetScheduleState(){
  flushing=false;
  queue.length=0;
}
const flushSchedulerQueue=()=>{
  flushing=true;
  queue.sort((a,b)=>(a.id-b.id)).forEach(watcher=>{
    watcher.run();
  });
  resetScheduleState();
}

const queueWatcher=(watcher)=>{
  if(flushing){
    // 动态插入新的watcher
  }else{
    queue.push(watcher);
  }
  requestAnimationFrame(flushSchedulerQueue)
}



let uid=0;
/**
 * 手动触发一次依赖收集，并将自己作为当前的订阅者传递出去
 */
export default class Watcher {
  constructor(fn, { lazy } = { lazy: false }) {
    this.getter = fn;
    this.depIds = [];
    this.newDepIds = [];
    this.newDepSet = new Set();
    this.depSet = new Set();

    this.lazy = lazy;
    this.dirty = true;
    this.oldVal = null;
    this.id = uid++;
    if (!this.lazy) {
      this.get();
    }
  }

  get() {
    if (this.lazy && !this.dirty) {
      return this.oldVal;
    }
    console.log("gettt");
    pushTarget(this);
    this.oldVal = this.getter();
    popTarget();
    this.cleanupDeps();
    this.dirty = false;
    return this.oldVal;
  }
  // TODO:本来watcher 初始化时会有回调函数的传入，但是暂时省略了，如果有的话这里还会有对回调函数的调用
  run() {
    const val = this.get();
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

  depend() {
    this.depSet.forEach((dep) => {
      dep.depend();
    });
  }

  update() {
    console.count("更新");
    if (this.lazy) {
      this.dirty = true;
    } else {
      queueWatcher(this);
    }
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

