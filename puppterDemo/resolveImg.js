var fs = require('fs');
// var tesseract = require('node-tesseract');
// var gm = require('gm');
var path = require('path');
const querystring = require('querystring');
var http = require('http');

// processImg("captcha.png", "captcha_1.jpg")
//   .then(recognizer)
//   .then(text => {
//     console.log(`识别结果:${text}`);
//   })
//   .catch(err => {
//     console.error(`识别失败:${err}`);
//   });
async function resloveImg(imgPath) {
  return new Promise((res, rej) => {
    processImg(imgPath, path.resolve(__dirname, 'captcha_xx.jpg'))
      .then(recognizer)
      .then(text => {
        res(text);
      })
      .catch(err => {
        rej(err);
      });
  });
}

/**
 * 处理图片为阈值图片
 * @param imgPath
 * @param newPath
 * @param [thresholdVal=55] 默认阈值
 * @returns {Promise}
 */
function processImg(imgPath, newPath, thresholdVal) {
  return new Promise((resolve, reject) => {
    gm(imgPath)
      .threshold(thresholdVal || 40000)
      .write(newPath, err => {
        if (err) return reject(err);

        resolve(newPath);
      });
  });
}

/**
 * 识别图片
 * @param imgPath
 * @param options tesseract options
 * @returns {Promise}
 */
function recognizer(imgPath, options) {
  options = Object.assign({ psm: 7 }, options);

  return new Promise((resolve, reject) => {
    tesseract.process(imgPath, options, (err, text) => {
      if (err) return reject(err);
      resolve(text.replace(/[\r\n\s]/gm, ''));
    });
  });
}

function resolveImgWithBase64(base64Str) {
  return new Promise((pres, prej) => {
    const postData = querystring.stringify({
      picBase64: base64Str,
    });

    const options = {
      hostname: '10.240.193.174',
      port: 8080,
      path: '/baidu/verificationCode',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    let ret = '';

    const req = http.request(options, res => {
      res.setEncoding('utf8');
      res.on('data', chunk => {
        ret += chunk.toString();
      });

      res.on('end', () => {
        pres(ret);
      });
    });

    req.on('error', e => {
      console.error(`请求遇到问题: ${e.message}`);
      prej(e.message);
    });

    // 写入数据到请求主体
    req.write(postData);
    req.end();
  });
}

module.exports = {
  resloveImg,
  resolveImgWithBase64,
};
