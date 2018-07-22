import { IMiddlewareFn } from "./IMiddleware";

import { KRequest } from "./KRequest";
import { KResponse } from "./KResponse";
import { Context } from "./Context";
import { compose } from "./utils";

class Application {
  scope: ServiceWorkerGlobalScope;
  middleware: IMiddlewareFn[] = [];

  constructor(scope: ServiceWorkerGlobalScope) {
    this.scope = scope;
  }

  use(fn: IMiddlewareFn) {
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
            if (ctx.res.body) {
              resolve(new Response(ctx.res.body));
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

export { IMiddlewareFn, Application };
