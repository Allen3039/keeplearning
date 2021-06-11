/**
 * 订阅者收集 和 通知
 */
let uid = 0;
export default class Dep {
  static target = null;
  subs = [];
  id = uid++;

  depend(sub) {
    sub.addDep(this);
  }

  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index > -1) {
      this.subs.splice(index, 1);
    }
  }

  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}
