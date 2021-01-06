function handleError(err) {
  // 框架层面
  console.log("框架 捕获error ", err);
}

function wrapDev(func) {
  var fakeNode = document.createElement("div");

  function run() {
    window.addEventListener("error", handleError);
    func();
    window.removeEventListener("error", handleError);
  }
  fakeNode.addEventListener("invokeFunc", run);

  fakeNode.dispatchEvent(new Event("invokeFunc"));
}

function wrapProd(func) {
  try {
    func();
  } catch (error) {
    handleError(error);
  }
}

const logicFunc = () => {
  throw new Error("error in logic");
};

console.log("线上");
wrapProd(logicFunc);

console.log("开发环境");
wrapDev(logicFunc);

console.log("xxx");

setTimeout(() => {
  throw new Error("an error");
}, 1000);
setTimeout(() => {
  console.log("i should be run in good");
}, 2000);
