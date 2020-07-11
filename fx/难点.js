gatsby 基于react的静态网站生成器

gatsby-node 里面在使用graphql查询json数据 然后动态生成page

// h5图片lazyload有问题 当时是怎么解决来着 瞧瞧!!!

function F(){
  
}
function xx(props) {
  return div
}

// export default ;

// middlewares 


const a=next=>(x)=>{
  console.log('TCL: a -> x', x)
  return next(x);
}
const b=next=>(x)=>{
  console.log('TCL: b -> x', x)
  return next(x);
}
const c=next=>(x)=>{
  console.log('TCL: c -> x', x)
  return next(x);
}

function apply(...fns){
  if(fns.length==0){
    return f=>f;
  }
  if(fns.length==1){
    return fns[0](f=>f)
  }
  var next=f=>f,res;
  
  for(var i=fns.length-1;i>=0;i--){
    next=(fns[i])(next);
  }
  return next;
}

apply(a)

apply(a,b)