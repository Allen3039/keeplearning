var a, count, words, text, i, word;
(function () {
  var $$0 = {
    enumerable: false,
    configurable: true,
    writable: true
  };

  var _$0 = this;

  var _$1 = _$0.TypeError;
  var _$2 = _$1.prototype;
  var _$3 = _$0.Object;
  var _$4 = _$3.defineProperty;

  var __constructor = function () {};

  _$0.text = "A number of W3C";
  var _2 = ["a", "number", "of", "w3c"];
  _$0.words = _2;
  var _8 = {
    a: 1,
    number: 1,
    of: 1,
    w3c: 1
  };
  _$0.count = _8;
  _$0.i = 0;
  _$0.word = "a";
  _$0.i = 1;
  _$0.word = "number";
  _$0.i = 2;
  _$0.word = "of";
  _$0.i = 3;
  _$0.word = "w3c";
  _$0.i = 4;
  console.log("yoo");
  console.log(1);
  _$0.d = 1;
  var _b = _$2;

  var _Y = (__constructor.prototype = _b, new __constructor());

  $$0.value = "attempt to change immutable binding", _$4(_Y, "message", $$0);
  $$0.value = "TypeError: attempt to change immutable binding\n    at 188.js:28:22", _$4(_Y, "stack", $$0);
  throw _Y;
}).call(this);