function compressImg(image, quality) {
  const canvas = document.createElement("canvas"); // 创建 canvas 元素
  canvas.width = image.width;
  canvas.height = image.height;
  canvas.getContext("2d").drawImage(image, 0, 0, image.width, image.height); // 绘制 canvas
  const canvasURL = canvas.toDataURL("image/jpeg", quality);
  const buffer = atob(canvasURL.split(",")[1]);
  console.log(buffer.length);
  let length = buffer.length;
  const bufferArray = new Uint8Array(new ArrayBuffer(length));
  while (length--) {
    bufferArray[length] = buffer.charCodeAt(length);
  }
  const miniFile = new File([bufferArray], "xx.jpg", {
    type: "image/jpeg",
  });
  const objectURL = window.URL.createObjectURL(miniFile);
  const aLink = document.createElement("a");
  aLink.setAttribute("download", "xx.jpg");
  aLink.setAttribute("href", objectURL);
  aLink.click();
  return miniFile;
}
