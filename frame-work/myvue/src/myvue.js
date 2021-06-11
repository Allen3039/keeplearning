import Observer from "./observer.js";
import Watcher from "./watcher.js";

export default class MyVue {
  constructor({ el, data }) {
    this.data = data;
    this.initData(data);
    this.$mount(el);
  }
  initData(data) {
    new Observer(data);
  }

  $mount(el) {
    const update = () => {
      // 在showLover为false的case 下，不响应lover字段的变更
      if (this.data.showLover) {
        document.querySelector(el).innerHTML = this.data.lover;
      }else{
        document.querySelector(el).innerHTML = 'I dont know';
      }
    };
    new Watcher(update);
  }
}
