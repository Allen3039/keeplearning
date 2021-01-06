// 自动插入分号机制(ASI)
// "分号插入"只是一个术语，并不意味着代码在解析时会真正的插入什么分号。 这只是一个当分号是可有可无的时候的比喻或者解释。

// 规范: 语法解析器将换行视为当前语句的一部分，除非有一个显式的分号结束这一行。 下面给出一些示例代码，你以为也许会有一个分号被自动插入，但是，实际上却不是的。 这个例子充分说明了忽略分号的风险。

// No ASI:

a = b + c(d + e).print();
// 这样的代码不会触发“分号插入”, 因为括号可以跟上上一行的 c，形成一个函数调用。 上面的代码解释为：

a = b + c(d + e).print();
// No ASI:

a = b / hi / g.exec(c).map(d);
// 同样没有分号插入, 第二行不会解释为正则表达式字面量，取而代之的是：

a = b / hi / g.exec(c).map(d);
// No ASI:

var foo = 'bar'[('red', 'green')].foreach(function(c) {
  console.log(c);
});
// 没有分号插入。 相反，第二行开头被解释为字符串 "bar" 的下标索引。 逗号分隔符也是符号语法操作的(执行了逗号的左侧和右侧，并返回逗号的右侧)

// ASI机制
// 1 新的行构成了非法语法
// 例如:

if (a < 0) a = 0;
console.log(a);

// 2 绝对禁止的行结束符: （ps：有些语句禁止插入行结束符,简而言之，在不该换行的地方发生了换行就会触发"分号插入机制"）
//  在 ECMAScript 标准中，语法规则严格按照如下的产生式。

// 后缀表达式
//     左值表达式 [无行终结符] ++
//     左值表达式 [无行终结符] --
// Continue 语句
//     continue [无行终结符] 标识符? ;
// Break 语句
//     break [无行终结符] 标识符? ;
// Return 语句
//     return [无行终结符] 表达式? ;
// Throw 语句
//     throw [无行终结符] 表达式? ;
