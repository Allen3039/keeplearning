### 只要你明确以下两点，相比于 Component，使用 PureComponent 就很安全：

- 改变数据通常是不好的，尤其是使用 PureComponent 时会让问题更复杂

- 如果你在 render 方法中创建了新函数，对象或数组，那么你的做法是错的
