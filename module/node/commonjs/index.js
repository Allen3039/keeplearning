const { counter, incCounter } = require("./counter.js");
console.log("counter", counter);
incCounter();
console.log("counter", counter);

import("./counter.js").then((res) => {
  console.log("res", res);
});
