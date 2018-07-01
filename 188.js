var i, word;
var text = "A number of W3C";
var words = text.toLowerCase().split(/[\s,.]/);
var count = {};
for (i = 0; i < words.length; i += 1) {
  word = words[i];
  if (count[word]) {
    count[word] += 1;
  } else {
    count[word] = 1;
  }
}

// logic 分段
const a = 1,
  b = 2,
  c = 3;

if ((a + b > c && a - b < 3) || a + c > b) {
  console.log("yoo");
}
