class StarrySky {
  constructor() {
    this.stars = [];
    // 初始化
    this.lastPaintSize = this.paintSize = {
      width: 0,
      height: 0
    };
  }
  static get inputProperties() {
    return ["--star-density", "--star-sky-seed"];
  }

  paint(ctx, paintSize, properties) {
    this.paintSize = paintSize;
    this.updateControls(properties);
    this.updateStars();
    this.drawStars(ctx);
  }
  updateControls(properties) {
    this.starDensity = +properties.get("--star-density").toString() || 1;
    this.seed = +properties.get("--star-sky-seed").toString() || 1;
  }
  updateStars() {
    // 如果当前的画布比上一次的要小，则删掉一些星星
    if (
      this.lastPaintSize.width > this.paintSize.width ||
      this.lastPaintSize.height > this.paintSize.height
    ) {
      this.removeStars();
    }
    // 如果当前画布变大了，则增加一些星星
    if (
      this.lastPaintSize.width < this.paintSize.width ||
      this.lastPaintSize.height < this.paintSize.height
    ) {
      this.addStars();
    }
    this.lastPaintSize = this.paintSize;
  }
  removeStars() {
    let stars = [];
    for (let star of stars) {
      if (star.x <= this.paintSize.width && star.y <= this.paintSize.height) {
        stars.push(star);
      }
    }
    this.stars = stars;
  }

  addStars() {
    let xMax = this.paintSize.width,
      yMax = this.paintSize.height;
    // 星星的数量
    let hmTimes = Math.round((xMax + yMax) * this.starDensity);
    for (let i = 0; i < hmTimes; i++) {
      let x = Math.floor(this.random() * xMax + 1),
        y = Math.floor(this.random() * yMax + 1);
      // 如果星星落在上一次的画布内，则跳过
      if (x < this.lastPaintSize.width && y < this.lastPaintSize.height) {
        continue;
      }

      this.stars.push({
        x: x,
        y: y,
        size: Math.floor(this.random() * 2 + 1)
        // 星星的亮暗
      });
    }
  }

  random() {
    let x = Math.sin(this.seed++) * 10000;
    return x - Math.floor(x);
  }
  drawStars(ctx) {
    for (let star of this.stars) {
      console.log(star);
      const {
        x: randomX,
        y: randomY,
        size: randomSize,
        opacityOne: randomOpacityOne,
        opacityTwo: randomOpacityTwo,
        hue: randomHue
      } = star;
      // ctx.fillStyle =
      //   "hsla(" +
      //   randomHue +
      //   ", 30%, 80%, ." +
      //   randomOpacityOne +
      //   randomOpacityTwo +
      //   ")";
      ctx.fillRect(randomX, randomY, randomSize, randomSize);
    }
  }
}

registerPaint("starry-sky", StarrySky);
