import { Application } from "./kosw/index";
import { Router } from "./middlewares/index";

class GraphWorker {
  scope: ServiceWorkerGlobalScope;
  app: Application;
  constructor(scope: ServiceWorkerGlobalScope) {
    this.scope = scope;
    const app = (this.app = new Application(scope));

    app.use(({ req, res }, next) => {
      if (req.path === "/test") {
        setTimeout(function() {
          res.body = "hello world";
          next();
        }, 1000);
      } else {
        next();
      }
    });

    app.listen();
  }
}

export { GraphWorker };
