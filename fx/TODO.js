TODO:
1 预处理器这些点:
嵌套
变量
循环语句
条件语句
自动前缀
单位转换
mixin复用


2 深拷贝


3 内存泄露

意外的全局变量: 无法被回收
定时器: 未被正确关闭，导致所引用的外部变量无法被释放
事件监听: 没有正确销毁 (低版本浏览器可能出现)
闭包: 会导致父级中的变量无法被释放
dom 引用: dom 元素被删除时，内存中的引用未被正确清空

可用 chrome 中的 timeline 进行内存标记，可视化查看内存的变化情况，找出异常点。

4 计算机通识 部分 https://yuchengkai.cn/docs/cs/

5 diff

6 react 虚拟dom 

7 webpack 优化插件 https://segmentfault.com/a/1190000016816813

8 replacestate push state

9 margin重叠?

10 js 数字表示

11 weakmap 

12 node 值引用验证

13 preact 性能diff https://juejin.im/post/5a0191f25188254de1699b0b#heading-12

