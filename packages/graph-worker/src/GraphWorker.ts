import { Router } from "./middlewares";
import { Application, Context } from "./server";

class GraphWorker {
  constructor(scope: ServiceWorkerGlobalScope) {
    const app = new Application(scope);
    const router = new Router();

    router.get("/test", (ctx: Context, next: Function) => {
      ctx.body = "222";
      next();
    });

    app.use(router.routes());
    app.listen();
  }
}

export { GraphWorker };
