import { Application } from "server-worker";
import { Router } from "server-worker-router";

const app = new Application(self);
const router = new Router();

router.get("/test", (ctx, next) => {
  ctx.body = "222";
  next();
});

router.get("/demo", (ctx, next) => {
  ctx.body = "demo:" + ctx.req.search;
  next();
});

app.use(router.routes());
app.listen();
