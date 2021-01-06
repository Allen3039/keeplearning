const puppeteer = require('puppeteer');
const path = require('path');
const imgAPI = require('./resolveImg');
const Ut = require('./common');
const http = require('http');
var fs = require('fs');

const targetURL = 'https://ssp.baidu.com/home';
// TODO:real account and pwd
const user = {
  account: 'youliaogacha',
  pwd: 'Youliao8985',
};

function getTestPersonaLoginCredentials(callback) {
  return http.get(
    {
      host: '10.240.193.174',
      port: '8080',
      path: '/baidu/test',
    },
    function(response) {
      var body = '';

      response.on('data', function(d) {
        body += d;
      });

      response.on('end', function() {
        // var parsed = JSON.parse(body);
        callback(body);
      });
    }
  );
}

// getTestPersonaLoginCredentials(res => {
//   console.log(res);
// });
const genAPIink = () => {
  const padZero = num => {
    return String.prototype.padStart.call(num, 2, '0');
  };
  const curDate = new Date();
  const y = padZero(curDate.getFullYear());
  const m = padZero(curDate.getMonth());
  const d = padZero(curDate.getDate());

  const date = y + m + d;
  const targetAPILink = `https://ssp.baidu.com/api/js/reports?begin=${date}&end=${date}&timeGranularity=sum&metrics=request,view,click,ecpm,cpc,income,clickRatio,fillRatio&pageNo=1&order=desc&orderBy=adPositionName&dimensions=adPositionId,adPositionName,businessSystemId,businessSystemName&pageSize=50`;
  return targetAPILink;
};
const doCrawlData = async () => {
  const browser = await puppeteer.launch({
    //设置超时时间
    timeout: 15000,
    //如果是访问https页面 此属性会忽略https错误
    ignoreHTTPSErrors: true,
    // 打开开发者工具, 当此值为true时, headless总为false
    devtools: false,
    // 关闭headless模式, 不会打开浏览器
    headless: true,
  });
  const page = await browser.newPage();
  await page.goto(targetURL);

  const loginRes = await login(page);

  console.log('登陆成功');
  // browser.close();

  const dataPage = await browser.newPage();
  await dataPage.goto(genAPIink());
  const data = await dataPage.$eval('pre', el => el.innerHTML);
  return data;
  console.log(data);
};

async function login(page) {
  await page.type('#entered-login', user.account);
  await page.type('#entered-password', user.pwd);

  const captcha = await getCaptcha(page);
  console.log('识别的验证码为', captcha);
  await page.type('#entered-imagecode', captcha);
  await page.click('.submit.input-field');
  await Ut.sleep(1000);
  if (
    page.url().indexOf('action=login') > -1 ||
    page.url().indexOf('errno') > -1
  ) {
    console.log('登陆失败,重试');
    return login(page);
  }
  return true;
}

async function getCaptcha(page) {
  // 截图获得验证码
  // const iframe = page.frames()[0];
  // const captchaSelector = '#captcha-image';

  // const captchaImg = await iframe.$(captchaSelector);
  // const imgInfo = await iframe.evaluate(e => {
  //   console.log(e);
  //   var img = e;

  //   var c = document.createElement('canvas');
  //   var ctx = c.getContext('2d');
  //   document.body.append(c);
  //   c.setAttribute('height', 40);
  //   c.setAttribute('width', 80);
  //   img = document.getElementsByTagName('img')[0];
  //   ctx.drawImage(img, 0, 0, 80, 40, 0, 0, 80, 40);

  //   return c.toDataURL();
  //   // return {
  //   //   x: e.x,
  //   //   y: e.y,
  //   //   width: e.width,
  //   //   height: e.height,
  //   // };
  // }, captchaImg);

  // const fileCaptchaPath = path.resolve(__dirname, 'captcha.jpg');

  // await page.screenshot({
  //   path: fileCaptchaPath,
  //   type: 'jpeg',
  //   quality: 100, // 只对jpg有效
  //   // 指定区域截图，clip和fullPage两者只能设置一个
  //   clip: imgInfo,
  // });

  // var imageData = fs.readFileSync(fileCaptchaPath); // 例：fileUrl="D:\\test\\test.bmp"
  // var imageBase64 = imageData.toString('base64');
  // END 截图获得验证码

  await page.waitForSelector('#captcha-image');
  const url = await page.$eval('#captcha-image', i => i.src);
  const content = await getResourceContent(page, url);
  const contentBuffer = Buffer.from(content, 'base64');

  const fileCaptchaPath = path.resolve(__dirname, 'captcha.jpg');
  fs.writeFileSync(fileCaptchaPath, contentBuffer, 'base64');

  // 替换为张成接口
  const resolvedCaptcha = await imgAPI.resolveImgWithBase64(content);

  if (resolvedCaptcha.length !== 4) {
    console.log('图片长度不是4丢弃重新识别', resolvedCaptcha);
    await page.click('#captcha-image');
    await Ut.sleep(1000);
    return getCaptcha(page);
  }
  return resolvedCaptcha;
}

async function crawlData(page, targetUrl) {}

module.exports = {
  doCrawlData,
};

async function getResourceTree(page) {
  var resource = await page._client.send('Page.getResourceTree');
  return resource.frameTree;
}

async function getResourceContent(page, url) {
  const { content, base64Encoded } = await page._client.send(
    'Page.getResourceContent',
    { frameId: String(page.mainFrame()._id), url }
  );
  var a = base64Encoded;
  return content;
}
