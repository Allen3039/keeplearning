const envRef = {
  env: "",
};

setTimeout(() => {
  envRef.env = "inited";
  module.exports.env2 = "inited";
}, 2000);

module.exports = {
  envRef,
  env2: "",
};
