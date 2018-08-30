const issues = {};
issues.watchers = [];
issues.listen = fn => {
  issues.watchers.push(fn);
};

issues.trigger = function() {
  for (
    let i = 0, watchers = this.watchers, watcher;
    (watcher = watchers[i]);
    i++
  ) {
    watcher.apply(this, arguments);
  }
};
// arguments 不能在箭头函数中使用
issues.listen(function() {
  console.log("watcher2", JSON.stringify(arguments));
});

issues.listen(() => {
  console.log("watcher1", JSON.stringify(arguments));
});

issues.trigger("发钱啦", "1个亿呢");

// define
(function(window) {
  function fn(str) {
    this.str = str;
  }

  fn.prototype.format = function() {
    var arg = Array.from(arguments);
    return this.str.replace(/\{(\d)\}/g, function(a, b) {
      console.log(a);
      return arg[b] || "";
    });
  };

  window.fn = fn;
})(window);

// use
(function() {
  var t = new fn('<p><a href="{0}">{1}</a><span>{2}</span></p>');
  console.log(t.format("http://www.alibaba.com", "Alibaba", "Welcome"));
})();

// tt commit
// tt commit2
// tt commit3
// tt commit4
