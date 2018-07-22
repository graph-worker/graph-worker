import {
  Context,
  compose,
  IMiddlewareFn,
  IMiddleware,
  INextFn
} from "../../server";
import { Layer } from "./Layer";

interface IRouterOptions {
  methods?: string[];
  routerPath?: string;
}

interface LayerMatched {
  path: Layer[];
  pathAndMethod: Layer[];
  route: boolean;
}

interface RouterContext extends Context {
  routerName: any;
  routerPath: string;
  matched: any;
  router: any;
  _matchedRoute: any;
  _matchedRouteName: any;
}

class Router {
  opts: IRouterOptions;
  methods: string[];
  params: any = {};
  stack: Layer[] = [];

  constructor(opts?: IRouterOptions) {
    this.opts = opts || {};
    this.methods = this.opts.methods || [
      "HEAD",
      "OPTIONS",
      "GET",
      "PUT",
      "PATCH",
      "POST",
      "DELETE"
    ];
  }

  match(path: string, method: string): LayerMatched {
    var layers = this.stack;
    var layer: Layer;

    var matched: LayerMatched = {
      path: [],
      pathAndMethod: [],
      route: false
    };

    for (var len = layers.length, i = 0; i < len; i++) {
      layer = layers[i];

      if (layer.match(path)) {
        matched.path.push(layer);

        if (layer.methods.length === 0 || ~layer.methods.indexOf(method)) {
          matched.pathAndMethod.push(layer);
          if (layer.methods.length) matched.route = true;
        }
      }
    }

    return matched;
  }

  register(path: string, methods: string[], ...middleware: IMiddleware): Layer {
    const route = new Layer(path, methods, middleware);
    this.stack.push(route);
    return route;
  }

  get(path: string, ...middleware: IMiddleware): Layer {
    return this.register(path, ["GET"], ...middleware);
  }

  post(path: string, ...middleware: IMiddleware): Layer {
    return this.register(path, ["POST"], ...middleware);
  }

  put(path: string, ...middleware: IMiddleware): Layer {
    return this.register(path, ["PUT"], ...middleware);
  }

  delete(path: string, ...middleware: IMiddleware): Layer {
    return this.register(path, ["DELETE"], ...middleware);
  }

  patch(path: string, ...middleware: IMiddleware): Layer {
    return this.register(path, ["PATCH"], ...middleware);
  }

  routes(): IMiddlewareFn {
    var router = this;

    var dispatch = (ctx: RouterContext, next: INextFn) => {
      var path = router.opts.routerPath || ctx.routerPath || ctx.path;
      var matched = router.match(path, ctx.method);
      var layerChain;

      if (ctx.matched) {
        ctx.matched.push.apply(ctx.matched, matched.path);
      } else {
        ctx.matched = matched.path;
      }

      ctx.router = router;

      if (!matched.route) return next();

      var matchedLayers = matched.pathAndMethod;
      var mostSpecificLayer = matchedLayers[matchedLayers.length - 1];
      ctx._matchedRoute = mostSpecificLayer.path;
      if (mostSpecificLayer.name) {
        ctx._matchedRouteName = mostSpecificLayer.name;
      }

      layerChain = matchedLayers.reduce(function(memo: any[], layer: Layer) {
        memo.push(function(ctx: RouterContext, next: Function) {
          ctx.captures = layer.captures(path);
          // ctx.params = layer.params(ctx.captures, ctx.params);
          ctx.routerName = layer.name;
          return next();
        });
        return memo.concat(layer.stack);
      }, []);

      return compose(layerChain)(ctx, next);
    };

    return dispatch as IMiddlewareFn;
  }
}

export { Router };
