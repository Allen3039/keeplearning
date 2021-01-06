const cloudinary = require("cloudinary").v2;

cloudinary.config({
  api_key: "226213659894838",
  api_secret: "LOUL29Law9g0crMbNGKfyerRQj8",
  cloud_name: "djp00u7gg",
});
cloudinary.uploader.upload("/Users/wk/Desktop/jxl.jpeg", function (
  err,
  result
) {
  console.log("err", err);
  console.log("result", result);
});

const url = cloudinary.url("dva", {
  size: "10x20",
});
console.log("url", url);
