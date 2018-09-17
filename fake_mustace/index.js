var fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "./index.txt");
var tpl = fs.readFileSync(filePath, "utf8");
var state = require("./data");
var Panda = require("./Panda");

const res = Panda.render(tpl, state);

console.log(res);
