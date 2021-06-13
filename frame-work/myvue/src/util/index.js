import Dep from "../dep.js";
import Watcher from "../watcher.js";
import { warn } from "./debug.js";

export * from "./debug.js";

export const defineComputed = (target, k, defRef) => {
  const getter = typeof defRef === "function" ? defRef : defRef.get;
  const setter =
    typeof defRef === "function"
      ? function () {
          warn(`no setter found of key ${k}`);
        }
      : defRef.set;
  Object.defineProperty(target, k, {
    get: wrapGetter(getter.bind(target)),
    set: setter,
  });
};

const wrapGetter = function (getter) {
  const watcher = new Watcher(getter, { lazy: true });
  return function () {
    const val = watcher.get();
    console.log("111");
    // 依赖外层的 watcher(比如update 的watcher)
    if (Dep.target) {
      watcher.depend();
    }
    return val;
  };
};
