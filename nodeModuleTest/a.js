var counter = 1;
function add() {
  counter++;
}
module.exports = {
  counter,
  add,
};

function XX() {
  const bar = () => console.log(this);

  bar();
}

XX();
new XX();

for (var i = 1; i <= 5; i++) {
  setTimeout(
    ((j) =>
      function timer() {
        console.log(j);
      })(i),
    i * 1000
  );
}

createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]); // => returns "(123) 456-7890"1111

function createPhoneNumber(arr) {
  let tmp = '(xxx) xxx-xxxx',
    i = 0;
  return tmp.replace(/x/g, ()=>arr[i++]);
}
createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);


findOdd([1,1,2,-2,5,2,4,4,-1,-2,5]); // => returns -1

function findOdd(arr){
  return arr.reduce((acc,cur)=>acc^cur)
}
findOdd([1,1,2,-2,5,2,4,4,-1,-2,5]); 


function findShort(str){
  return Math.min(...str.split(' ').map(item=>item.length));
}
findShort("bitcoin take over the world maybe who knows perhaps") // returns 3，因为最短单词是the和who，长度为3

function likes(peoples) {
  var tmps=[
    "no one likes this",
    "{name} likes this",
    "{name} and {name} likes this",
    "{name},{name} and {left} others likes this", 
  ]
  var tmp=tmps[Math.min(peoples.length,3)];


  return tmp.replace(/{name}|{left}/g,(val)=>{
    if(val=="{name}"){
      return peoples.shift();
    }else{
      return peoples.length
    }
  })
}


likes [] // must be "no one likes this"
likes ["Peter"] // must be "Peter likes this"
likes ["Jacob", "Alex"] // must be "Jacob and Alex like this"
likes ["Max", "John", "Mark"] // must be "Max, John and Mark like this"
likes ["Alex", "Jacob", "Mark", "Max"] // must be "Alex, Jacob and 2 others like this"

