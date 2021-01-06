const CDP = require("chrome-remote-interface");

async function example() {
  let client;
  try {
    // connect to endpoint
    client = await CDP({
      port: 64333,
    });
    // extract domains
    const { Network, Page, Debugger } = client;
    // setup handlers
    Network.requestWillBeSent((params) => {
      console.log(params.request.url);
    });
    client.on("event", (message) => {
      console.log("example -> message", message.method);
    });

    // enable events then start!
    // await Network.enable();

    await Page.enable();
    await Debugger.enable();
    // await Page.navigate({ url: "https://github.com" });
    // await Page.loadEventFired();
  } catch (err) {
    console.error(err);
  } finally {
  }
}

example();
