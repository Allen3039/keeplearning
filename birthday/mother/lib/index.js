"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// helper functions
var PI2 = Math.PI * 2;

var random = function random(min, max) {
  return Math.random() * (max - min + 1) + min | 0;
};

var timestamp = function timestamp(_) {
  return new Date().getTime();
}; // container


var Birthday =
/*#__PURE__*/
function () {
  function Birthday() {
    _classCallCheck(this, Birthday);

    this.resize(); // create a lovely place to store the firework

    this.fireworks = [];
    this.counter = 0;
  }

  _createClass(Birthday, [{
    key: "resize",
    value: function resize() {
      this.width = canvas.width = window.innerWidth;
      var center = this.width / 2 | 0;
      this.spawnA = center - center / 4 | 0;
      this.spawnB = center + center / 4 | 0;
      this.height = canvas.height = window.innerHeight;
      this.spawnC = this.height * 0.1;
      this.spawnD = this.height * 0.5;
    }
  }, {
    key: "onClick",
    value: function onClick(evt) {
      var x = evt.clientX || evt.touches && evt.touches[0].pageX;
      var y = evt.clientY || evt.touches && evt.touches[0].pageY;
      var count = random(3, 5);

      for (var i = 0; i < count; i++) {
        this.fireworks.push(new Firework(random(this.spawnA, this.spawnB), this.height, x, y, random(0, 260), random(30, 110)));
      }

      this.counter = -1;
    }
  }, {
    key: "update",
    value: function update(delta) {
      ctx.globalCompositeOperation = 'hard-light';
      ctx.fillStyle = "rgba(20,20,20,".concat(7 * delta, ")");
      ctx.fillRect(0, 0, this.width, this.height);
      ctx.globalCompositeOperation = 'lighter';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.fireworks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var firework = _step.value;
          firework.update(delta);
        } // if enough time passed... create new new firework

      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.counter += delta * 3; // each second

      if (this.counter >= 1) {
        this.fireworks.push(new Firework(random(this.spawnA, this.spawnB), this.height, random(0, this.width), random(this.spawnC, this.spawnD), random(0, 360), random(30, 110)));
        this.counter = 0;
      } // remove the dead fireworks


      if (this.fireworks.length > 1000) this.fireworks = this.fireworks.filter(function (firework) {
        return !firework.dead;
      });
    }
  }]);

  return Birthday;
}();

var Firework =
/*#__PURE__*/
function () {
  function Firework(x, y, targetX, targetY, shade, offsprings) {
    _classCallCheck(this, Firework);

    this.dead = false;
    this.offsprings = offsprings;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.shade = shade;
    this.history = [];
  }

  _createClass(Firework, [{
    key: "update",
    value: function update(delta) {
      if (this.dead) return;
      var xDiff = this.targetX - this.x;
      var yDiff = this.targetY - this.y;

      if (Math.abs(xDiff) > 3 || Math.abs(yDiff) > 3) {
        // is still moving
        this.x += xDiff * 2 * delta;
        this.y += yDiff * 2 * delta;
        this.history.push({
          x: this.x,
          y: this.y
        });
        if (this.history.length > 20) this.history.shift();
      } else {
        if (this.offsprings && !this.madeChilds) {
          var babies = this.offsprings / 2;

          for (var i = 0; i < babies; i++) {
            var targetX = this.x + this.offsprings * Math.cos(PI2 * i / babies) | 0;
            var targetY = this.y + this.offsprings * Math.sin(PI2 * i / babies) | 0;
            birthday.fireworks.push(new Firework(this.x, this.y, targetX, targetY, this.shade, 0));
          }
        }

        this.madeChilds = true;
        this.history.shift();
      }

      if (this.history.length === 0) this.dead = true;else if (this.offsprings) {
        for (var _i = 0; this.history.length > _i; _i++) {
          var point = this.history[_i];
          ctx.beginPath();
          ctx.fillStyle = 'hsl(' + this.shade + ',100%,' + _i + '%)';
          ctx.arc(point.x, point.y, 1, 0, PI2, false);
          ctx.fill();
        }
      } else {
        ctx.beginPath();
        ctx.fillStyle = 'hsl(' + this.shade + ',100%,50%)';
        ctx.arc(this.x, this.y, 1, 0, PI2, false);
        ctx.fill();
      }
    }
  }]);

  return Firework;
}();

var canvas = document.getElementById('birthday');
var ctx = canvas.getContext('2d');
var then = timestamp();
var birthday = new Birthday();

window.onresize = function () {
  return birthday.resize();
};

document.onclick = function (evt) {
  return birthday.onClick(evt);
};

document.ontouchstart = function (evt) {
  return birthday.onClick(evt);
};

(function loop() {
  requestAnimationFrame(loop);
  var now = timestamp();
  var delta = now - then;
  then = now;
  birthday.update(delta / 1000);
})();

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var Wish =
/*#__PURE__*/
function () {
  function Wish(text, node) {
    _classCallCheck(this, Wish);

    this.text = text;
    this.index = 0;
    this.node = node;
  }

  _createClass(Wish, [{
    key: "draw",
    value: function draw() {
      this._draw();
    }
  }, {
    key: "_draw",
    value: function _draw() {
      this.index++;
      this.node.innerText = this.text.slice(0, this.index);

      if (this.index < this.text.length) {
        window.requestAnimationFrame(this._draw.bind(this));
      }
    }
  }]);

  return Wish;
}();

new Wish('Happy Birthday!', document.getElementById('wish')).draw();