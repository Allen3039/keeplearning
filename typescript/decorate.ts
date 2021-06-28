let logTarget;
function logProperty(target: any, key: string) {
  console.log("logProperty -> target", typeof target);
  console.log("logProperty -> desc", arguments);
  logTarget = target;
  delete target[key];

  const backingField = "_" + key;

  Object.defineProperty(target, backingField, {
    writable: true,
    enumerable: true,
    configurable: true,
  });

  // property getter
  const getter = function (this: any) {
    const currVal = this[backingField];
    console.log(`Get: ${key} => ${currVal}`);
    return currVal;
  };

  // property setter
  const setter = function (this: any, newVal: any) {
    console.log(`Set: ${key} => ${newVal}`);
    this[backingField] = newVal;
  };

  // Create new property with getter and setter
  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

class Person {
  @logProperty
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const p1 = new Person("semlinker");
p1.name = "kakuqo";
console.assert(p1 === logTarget);




function Log(target: Function, key: string, parameterIndex: number) {
    let functionLogged = key || target.prototype.constructor.name;
    console.log(`The parameter in position ${parameterIndex} at ${functionLogged} has
      been decorated`);
  }
    
  
   @Log 
   function constructor(phrase: string) {
      this.greeting = phrase; 
    }
  // console output: The parameter in position 0 
  // at Greeter has been decorated
  


  function deco(target){

  }

  @deco
  class  bar{

  }

  class TestClass {

    constructor(
      public name: string,
      public age: number
    ) {}
  }
 
  interface CLS{
      new (...args):any;
  }

  const classA:CLS=TestClass;
  
  type X=typeof TestClass ;
//   extends new (...args)=>any?true:false;

  const a={b:1}
  type X1=typeof a;