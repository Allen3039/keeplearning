1. 盒模型
页面渲染时，dom 元素所采用的 布局模型。可通过box-sizing进行设置。根据计算宽高的区域可分为：

content-box (W3C 标准盒模型) 仅仅包含内容部分
border-box (IE 盒模型) 包含内容 padding border部分

2. BFC,是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

触发条件:
1 display:inline-block/flex 里的子元素
2 float
3 overflow!=visible
4 position:absolute/fixed

特性:
1 元素垂直排列.
2 垂直方向的margin会重叠
3 BFC元素的左边界会与容器的左边界重合
4 float元素高度也会计算在内
5 float 不会与BFC重合
6 BFC里面的元素不会受外界影响

自适应两栏布局? div.fl div.fr div.bfc

3 层叠
1 position 非static
2 flex 的子元素
3 opacity 不是1的
4 transform不为none
5 will-change为opacity或transform时
https://user-gold-cdn.xitu.io/2019/2/14/168e9d9f3a1d368b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1




###js 部分

1 执行上下文
可以理解为一个对象:
 VO 
 作用域链
 this 

1.1 VO 
function test(){
  console.log(a); // func
  function a(){}
  console.log(a);// func
  var a=1; 
  console.log(a);  //1 
}

1.2 
声明提前
非匿名执行函数函数名不可修改

(function foo() {
  foo = 10  // 由于foo在函数中只为可读，因此赋值无效
  console.log(foo)
}()) 


2 闭包
父函数被销毁的情况下，子函数任然保持着对父函数中变量的引用。
单例用法其一
class Storage {
  static getInstance=(function() {
    var instance;
    return function(){
      if (!instance) {
        instance = new Storage();
      }
      return instance;
    }
  })()
  setItem = (key, value) => localStorage.setItem(key, value)
  getItem = key => localStorage.getItem(key)
}



3 对象
 深拷贝 // TODO:

 4 节流和防抖
 节流: 高频时间变为一定频率内只响应一次 举例：滚动
 防抖: 只响应最后一次  举例：用户输入

 
5 浏览器缓存
1 ETag/If-None-Match
2 Last-Modified/If-Modified-Since


6 vue 数据监听实现
1 依赖收集器Dep
2 观察者Watcher 
先通过重定义对象的属性get set 构建一个Dep 实例收集watcher。
然后调用Wathcer对象构造函数=>调用对象getter函数=>把当前watcher实例加入到指定属性的依赖中
最后调用setter的时候就会自动触发,dep里面的watchers了

7 prefetch 预取（非当前页面） preload (当前页面) 

8 1px 
transform:scaleY(.5)
background:linear-gradient(0,#fff,000)
svg 


9 
function flap(arr){
  return arr.reduce((pre,cur)=>{
    if(Array.isArray(cur)){
      return [...pre,...flap(cur)];
    }
    return [...pre,cur];
  },[])
}

// css-modules OR css in js 分析 http://hkongm.github.io/2018/07/25/ReactStyleTypes/

// 有料
// http headers 
// http 缓存原理 https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
// 项目综述 难点
// redux react provider 
// webpack优化
// https://30secondsofinterviews.org/  mark:Does JavaScript pass by value or by reference?
// 移动端 性能优化 ?


2.2.2.2

1.1.1.1->10.10.10.10

function sort(arr,num){
  
  var mid=num.length/2;
  while (mid>=0) {
    if(arr[mid]==num){
      return mid;
    }
    if(arr[mid]<num){
      mid= Math.floor(mid/2);
    }else{
      mid=Math.floor((mid+arr.length)/2);
    }
  }
  return false;
}





function find(arr,num,index){

  if(!arr.length){
  return false;
  }
  if(arr.length==1){
  return num==arr[0]
  }
  var mid=index
  if(arr[mid]==num){
  return mid
  }
  if(arr[mid]<num){
  return find(arr,num,Math.floor((mid+arr.length)/2))
  }
  if(arr[mid]>num){
  return find(arr,num,Math.floor((mid-1)/2))
  }
  }
  
  function ff(arr,num){
    return find(arr,num,Math.floor(arr.length/2))
  
  }


  function binaryS(arr,num){
    var left=0,right=arr.length-1,mid;
    while(left<=right){
      mid=Math.floor(left+right);
      if(arr[mid]==num){return mid}
      if(arr[mid]>num) {
        right=mid-1;
      }
      if(arr[mid<num]){
        left=mid+1;
      }
    }
    return false
  }


2.2.2.2

1.1.1.1 -> 10.10.10.10

100.10.10.10 -> 100.20.10.10