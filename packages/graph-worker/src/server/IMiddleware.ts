import { Context } from "./Context";

interface IMiddlewareFn {
  (ctx: Context, next: Function): any;
}

type IMiddleware = IMiddlewareFn[];

export { IMiddleware, IMiddlewareFn };
