function limitLoad(urls, loadImage, count) {
  let taskRunning = 0;
  let idx = 0;
  function newTask() {
    if (idx === urls.length) {
      return;
    }
    taskRunning++;
    return new Promise.resolve(loadImage(urls[idx++])).then(() => {
      taskRunning--;
      return newTask();
    });
  }
  while (taskRunning < count) {
    newTask();
  }
}

// promise race 实现
