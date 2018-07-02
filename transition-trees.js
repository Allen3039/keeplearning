// node --allow-natives-syntax transition-trees.js
// 原文链接 https://juejin.im/post/5b3978f2f265da59810b7ca0
let a = {x:1, y:2, z:3};

let b = {};
b.x = 1;
b.y = 2;
b.z = 3;

console.log("a is", a);
console.log("b is", b);
console.log("a and b have same map:", %HaveSameMap(a, b));

let a1 = Object.assign({}, {x:1, y:2, z:3});

let b1 = Object.assign({}, a1,{x:'1'});

console.log("a1 is", a1);
console.log("b1 is", b1);
console.log("a1 and b1 have same map:", %HaveSameMap(a1, b1)); // true

const todo = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TODO":
    return Object.assign({},{
      id: action.id,
      text: action.text,
      completed: false
    });
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }

      return Object.assign({}, state, {
        completed: !state.completed
      });

    default:
      return state;
  }
};
const s1 = todo(
  {},
  {
    type: "ADD_TODO",
    id: 1,
    text: "Finish blog post"
  }
);

const s2 = todo(s1, {
  type: "TOGGLE_TODO",
  id: 1
});



console.log("s1 and s2 have same map:", %HaveSameMap(s1, s2)); // true
