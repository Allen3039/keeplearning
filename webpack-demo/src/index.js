import _ from "lodash";
function component() {
  let element = document.createElement("div");

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(["Hello", "webpack"], " ");
  console.log(testPresetFlow(1, 2, 3));
  const res = "hello world" |> doubleSay |> capitalize |> exclaim;
  console.log(res);
  return element;
}

function testPresetFlow(one: any, two: number, three?): string {
  return one + two + three;
}

function doubleSay(str) {
  return str + ", " + str;
}
function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}
function exclaim(str) {
  return str + "!";
}

document.body.appendChild(component());
