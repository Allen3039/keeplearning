//generator error
function* genSome() {
  while (true) {
    yield Date().toString();
  }
}

const timer = genSome();
let t = timer.next();
console.log("function*genSome -> t", t);
t = timer.next();
console.log("function*genSome -> t", t);

try {
  timer.throw(Error("a custom error"));
} catch (error) {
  console.log("eeeee ", error);
}
