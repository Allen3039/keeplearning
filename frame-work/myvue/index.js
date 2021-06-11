import MyVue from "./src/myvue.js";

window.vm = new MyVue({
  el: "#app",
  data: {
    showLover: true,
    lover: "cyy",
  },
});
