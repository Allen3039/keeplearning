var obj = ["a"];

function setLogger(target, property) {
  console.table(['set', JSON.stringify(target), property]);
}

function getLogger(target, property) {
  console.table(['get', JSON.stringify(target), property]);
}

function watch(obj, setLogger, getLogger) {
  var handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property,value, receiver) {
      setLogger(target, property,value);
      return Reflect.set(target, property,value, receiver);
    },
  };
  return new Proxy(obj, handler);
}

obj = watch(obj, setLogger, getLogger);

obj[1] = "b";

