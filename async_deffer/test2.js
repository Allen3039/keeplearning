console.log('test2');
document.addEventListener('DOMContentLoaded', function() {
  console.log('test2-2');
});



function batches(recipe, available){
  return Math.floor(
    Math.min(...Object.keys(available).map(k=>available[k]/recipe[k]||0))
  )
}
batches(
  { milk: 2, sugar: 40, butter: 20 },
  { milk: 5, sugar: 120, butter: 500 }
)

function example() {
  console.log(this)
}

function bind(fn,thisObj){
  return function F(...args){
    if(this instanceof F){
      return new 
    }
    fn.apply(thisObj,args)
  }
}
const boundExample = bind(example, { a: true })
boundExample.call({ b: true }) // logs { a: true }

