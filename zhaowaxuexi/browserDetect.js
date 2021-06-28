function checkSupportWebp() {
  try {
    return (
      document
        .createElement("canvas")
        .toDataURL("image/webp") // 如果不支持 返回的就是 data:image/png 打头的数据了
        .indexOf("data:image/webp") === 0
    );
  } catch (error) {
    return false;
  }
}
