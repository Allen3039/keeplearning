function Greeter(say) {
  return function (target: Function): void {
    target.prototype.greet = function (): void {
      console.log(say);
    };
  };
}

@Greeter("haha")
class Greeting {
  constructor() {
    // 内部实现
  }
}

let myGreeting = new Greeting();
myGreeting.greet(); // console output: 'Hello Semlinker!';
