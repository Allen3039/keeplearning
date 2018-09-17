const puppeteer = require('puppeteer');
const path = require('path');
const resolveImg = require('./resolveImg');
const Ut = require('./common');

const targetURL = 'https://ssp.baidu.com/home';
// TODO:real account and pwd
const user = {
  account: 'xxx',
  pwd: 'yyy',
};

const targetAPILink =
  'https://ssp.baidu.com/api/js/reports?begin=20180905&end=20180905&timeGranularity=sum&metrics=request,view,click,ecpm,cpc,income,clickRatio,fillRatio&pageNo=1&order=desc&orderBy=adPositionName&dimensions=adPositionId,adPositionName,businessSystemId,businessSystemName&pageSize=50';

(async () => {
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
  await dataPage.goto(targetAPILink);
  const data = await dataPage.$eval('pre', el => el.innerHTML);

  console.log(data);
})();

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
  const iframe = page.frames()[0];
  const captchaSelector = '#captcha-image';

  const captchaImg = await iframe.$(captchaSelector);
  const imgInfo = await iframe.evaluate(e => {
    console.log(e);
    return {
      x: e.x,
      y: e.y,
      width: e.width,
      height: e.height,
    };
  }, captchaImg);

  const fileCaptchaPath = path.resolve(__dirname, 'captcha.png');

  await page.screenshot({
    path: fileCaptchaPath,
    type: 'png',
    // quality: 100, 只对jpg有效
    // 指定区域截图，clip和fullPage两者只能设置一个
    clip: imgInfo,
  });

  const resolvedCaptcha = await resolveImg(fileCaptchaPath);
  if (resolvedCaptcha.length !== 4) {
    console.log('图片长度不是4丢弃重新识别', resolvedCaptcha);
    await page.click('#captcha-image');
    await Ut.sleep(1000);
    return getCaptcha(page);
  }
  return resolvedCaptcha;
}

async function crawlData(page, targetUrl) {}
