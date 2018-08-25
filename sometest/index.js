const querystring = require("querystring");
const https = require("https");

var postData = querystring.stringify({
  grant_type: "authorization_code",
  client_secret:
    "8e8faf679c3440acb816627a2828dee5a652c5ba859911e8bf455cf3fc97049c",
  redirect_url: "http://10.242.35.18:8000",
  client_id: "a652bfc0859911e8bf455cf3fc97049c",
  code: "bd3597bd9ba345359e34ede8675b88cf"
});

var options = {
  hostname: "login.netease.com",
  port: 443,
  path: "/connect/token",
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Content-Length": postData.length,
    referer: "http://10.242.35.18:8000"
  }
};

var req = https.request(options, res => {
  console.log("statusCode:", res.statusCode);
  console.log("headers:", res.headers);

  res.on("data", d => {
    process.stdout.write(d);
  });
});

req.on("error", e => {
  console.error(e);
});

req.write(postData);
req.end();
