const pup = require("puppeteer");
const websocket = require("websocket");

const main = async () => {
  const browser = await pup.launch({ headless: false });
  browser.on("");
  const page = await browser.newPage();
  page.goto("http://www.baidu.com");
  const endp = browser.wsEndpoint();
  we;
  console.log("main -> endp", endp);
  const client = new websocket.client();
  client.on("connect", (conect) => {
    console.log("main -> conect");
    client.on("message", (msg) => {
      console.log("main -> msg", msg);
    });
  });
  client.connect(endp + "dsadsa");
};
main();
