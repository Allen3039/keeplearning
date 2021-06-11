/**
 * 订阅者收集 和 通知
 */
export default class Dep {
  static target = null;
  subs = [];
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => sub.update());
  }
}
