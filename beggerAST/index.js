const bable = require("babel-core");

const babelString = "const a=1+2+3+4+5/2+2**2";

const result = bable.transform(babelString, {
  plugins: [require("./ast.js")]
});

console.log("====================================");
console.log(result.code);
console.log("====================================");
