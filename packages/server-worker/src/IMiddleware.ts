import { Context } from "./Context";

interface IMiddlewareFn {
  (ctx: Context, next: INextFn): any;
}

interface INextFn extends IMiddlewareFn {
  (): any;
}

type IMiddleware = IMiddlewareFn[];

export { IMiddleware, IMiddlewareFn, INextFn };
