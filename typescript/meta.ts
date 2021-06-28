// 原始实现是基于weakmap来实现的
// weakmap 是为了解决垃圾回收机制（标记清除算法）
// 希望主动清除map上的key来做的
// 不同于map weakmap上的key 的值被置为null 时，如果并不存引用就会清空
// key 不能被遍历，我理解如果能遍历，那么在莫一时刻，key因为回收机制被清空了那么表现就不一致了

const Reflect = {
  metadata(k, v) {
    return function (target, propKey?) {
      console.log("metadata -> target", target);
      console.log("metadata -> target", target.prototype);
      if (propKey) {
        target[propKey].__proto__["_" + k] = v;
      } else {
        target.__proto__["_" + k] = v;
      }
    };
  },
  getMetadata(k, obj, propKey?) {
    if (propKey) {
      return obj[propKey].__proto__["_" + k];
    } else {
      return obj.__proto__["_" + k];
    }
  },
};

@Reflect.metadata("token", "aW1vb2M=")
class Employee {
  @Reflect.metadata("level", "D2")
  salary() {
    console.log("这是个秘密");
  }

  @Reflect.metadata("times", "daily")
  static meeting() {}

  "@aa"() {}
}

const token = Reflect.getMetadata("token", Employee);
const level = Reflect.getMetadata("level", new Employee(), "salary");
const times = Reflect.getMetadata("times", Employee, "meeting");

console.log(token); // aW1vb2M=
console.log(level); // D2
console.log(times); // daily

interface I1 {
  "+ds"(): void;
}
console.log(Object.prototype);
