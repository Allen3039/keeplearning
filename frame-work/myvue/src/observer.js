import Dep from "./dep.js";

/**
 * 让数据get set 都可被观察到
 * 好做依赖收集 和 更新事件通知
 */
export default class Observer {
  constructor(data) {

    Object.defineProperty(data,"__ob__",{
        enumerable:false,
        value:this,
        configurable:true
    })
    this.dep=new Dep();
    if(Array.isArray(data)){
        protoAugment(data);
        this.observerArray(data);
    }else{
        this.walk(data);
    }
  }
  walk(data) {
    Object.keys(data).forEach((k) => {
      defineReactive(data, k);
    });
  }
  observerArray(arr) {
    const length = arr.length;
    for (let i = 0; i < length; i++) {
      observe(arr[i]);
    }
  }
}

function observe(data){
    if(typeof data !=="object"){
        return 
    }
    return new Observer(data);
}
const methodsToPath = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse",
];

function protoAugment(array) {
  const arrProto = Object.create(Array.prototype);
  methodsToPath.forEach((method) => {
    arrProto[method] = function mutator(...args) {
        const ob=this.__ob__;
        [][method].apply(this,args);
        let inserted=[];
        switch(method){
            case "push":
            case "unshift":
                inserted=args;
                break;
            case "splice":
                inserted=args.slice(2);
                break;
        }
        if(inserted){
            ob.observerArray(inserted);
        }
        ob.dep.notify();
    };
  });

  Object.setPrototypeOf(array, arrProto);
}

function defineReactive(data, key) {
  const dep = new Dep();
  dep.key = key;
  let val = data[key];

  let ob;
  // 递归 watch
  if (typeof val === "object") {
    ob= new Observer(val);
  }
  Object.defineProperty(data, key, {
    get() {
      console.log("访问" + key);
      if (Dep.target) {
        dep.depend(Dep.target);
      }
      if(ob){
          ob.dep.depend();
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
