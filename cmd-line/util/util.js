const fs = require("fs");
const path = require("path");
const { writeFileSync, readFileSync, existsSync } = fs;
const assert = require("assert");
const handlebars = require("handlebars");

const readFile = path => {
  return readFileSync(path, "utf-8");
};
const getTemplate = name => {
  const filePath = path.join(__dirname, `./boilerplates/${name}.handlebars`);
  assert(existsSync(filePath), `template of ${name} should exist`);
  const file = readFile(filePath);

  return handlebars.compile(file);
};

const writeFile = (path, source) => {
  return writeFileSync(path, source, "utf-8");
};

module.exports = {
  readFile,
  writeFile,
  getTemplate
};
