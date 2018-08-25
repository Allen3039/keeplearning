const Koa = require("koa");
const serve = require("koa-static");
const app = new Koa();

app.use(serve("."));

app.listen(3333, () => {
  console.log("listening on port 3333");
});
