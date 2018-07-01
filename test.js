const issues = {};
issues.watchers = [];
issues.listen = (fn) => {
  issues.watchers.push(fn);
}

issues.trigger = function() {
  for (let i = 0, watchers = this.watchers, watcher; watcher = watchers[i]; i++) {
    watcher.apply(this, arguments);
  }
}
// arguments 不能在箭头函数中使用
issues.listen(function() { console.log("watcher2", JSON.stringify(arguments)) });

issues.listen(() => { console.log("watcher1", JSON.stringify(arguments)) });



issues.trigger("发钱啦", "1个亿呢");
