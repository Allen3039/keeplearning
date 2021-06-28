import Observer from "./observer.js";
import Watcher from "./watcher.js";
import {defineComputed} from "./util/index.js"
export default class MyVue {
  constructor({ el, data,computed }) {
    this._data = data;
    this.initData(data);
    this.initComputed(computed);
    this.$mount(el);
  }

  initData(data) {
      Object.keys(data).forEach((k)=>{
          Object.defineProperty(this,k,{
              get(){
                  return this._data[k];
              },
              set(v){
                this._data[k]=v;
              }
          })
      });

    new Observer(data);
  }

  initComputed(computedProps){
    Object.keys(computedProps).forEach(k=>{
        defineComputed(this,k,computedProps[k]);
    })
}
  $mount(el) {
    const update = () => {
      // 在showLover为false的case 下，不响应lover字段的变更
      if (this.showLover) {
        document.querySelector(el).innerHTML = JSON.stringify({
          //   lover: this.lover,
          aunt: this.aunt,
          doubleAge: this.doubleAge,
          arr: this.arr,
          //   arr0dota: this.arr[0].a,
        });
      }else{
        document.querySelector(el).innerHTML = 'I dont know';
      }
    };
    new Watcher(update);
  }
}
