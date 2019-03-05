var promises = [1, 2, 3, 4].map((val) => {
  return () =>
    new Promise((res, rej) => {
      setTimeout(() => {
        console.log(val);
        res(val);
      }, val * 1000);
    });
});

// var asyncDo = (tasks) => {
//   return tasks.reduce((pre, cur) => {
//     return pre.then((result) => {
//       return cur();
//     });
//   }, Promise.resolve());
// };



// var asyncDo = async (tasks) => {
//   for (let task of tasks) {
//     await task();
//   }
// };


var asyncDo=(tasks)=>{
  let a=Promise.resolve();
  for(let i=0;i<tasks.length;i++){
    console.log(tasks[i])
    a=a.then(()=>{
      return (tasks[i])();
    })
  }
  return a;
}
asyncDo(promises).then(() => {
  console.log('done');
});