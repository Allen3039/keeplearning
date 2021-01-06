import { counter, incCounter } from "./counter.js";
import { createRequire } from "module";
console.log("counter", counter);
incCounter();
console.log("counter", counter);
import("./counter.js").then((res) => {
  console.log("res", res);
});

console.log("import.meta.url", import.meta.url);
// import.meta.url
const require = createRequire(import.meta.url);
const b = require("./a.cjs");
console.log("b", b);
