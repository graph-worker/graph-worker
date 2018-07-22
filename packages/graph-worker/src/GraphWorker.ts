import { Router } from "./middlewares";
import { Application, Context, INextFn } from "./server";

class GraphWorker {
  constructor(scope: ServiceWorkerGlobalScope) {
    const app = new Application(scope);
    const router = new Router();

    router.get("/test", (ctx: Context, next: INextFn) => {
      ctx.body = "222";
      next();
    });

    router.get("/demo", (ctx: Context, next: INextFn) => {
      ctx.body = "demo:" + ctx.req.search;
      next();
    });

    app.use(router.routes());
    app.listen();
  }
}

export { GraphWorker };
