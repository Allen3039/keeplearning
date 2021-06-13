import MyVue from "./src/myvue.js";

window.vm = new MyVue({
  el: "#app",
  data: {
    showLover: true,
    lover: "cyy",
    age: 18,
  },
  computed: {
    doubleAge: {
      get() {
        return this.age * 2;
      },
      set(v) {
        this.age = v / 2;
      },
    },
    aunt: function () {
      return this.lover + "'s monther";
    },
  },
});
