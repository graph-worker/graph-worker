import { KRequest } from "./KRequest";
import { KResponse } from "./KResponse";
import { Context } from "./Context";
import { compose } from "./utils/index";

interface IMiddleware {
  (ctx: Context, next: Function): any;
}

class Application {
  scope: ServiceWorkerGlobalScope;
  middleware: IMiddleware[] = [];

  constructor(scope: ServiceWorkerGlobalScope) {
    this.scope = scope;
  }

  use(fn: IMiddleware) {
    if (typeof fn !== "function")
      throw new TypeError("middleware must be a function!");
    this.middleware.push(fn);
  }

  listen() {
    this.scope.addEventListener("fetch", this.callback());
  }

  callback() {
    const handleRequest = (event: FetchEvent) => {
      const ctx = this.createContext(event);
      const fn = compose(this.middleware);

      event.respondWith(
        new Promise((resolve, reject) => {
          fn(ctx, () => {
            if (ctx.body) {
              resolve(new Response(ctx.body));
            } else {
              // fallback to default behavior
              resolve(fetch(event.request));
            }
          });
        })
      );
    };
    return handleRequest;
  }

  createContext(event: FetchEvent) {
    const request = new KRequest(event.request);
    const response = new KResponse(request, event);
    return new Context(request, response);
  }
}

export { Application };
