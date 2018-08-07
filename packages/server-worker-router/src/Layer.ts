import pathToRegExp, { Key, ParseOptions, RegExpOptions } from "path-to-regexp";

import { IMiddleware } from "server-worker";
import { safeDecodeURIComponent } from "./safeDecodeURIComponent";

type LayerOptions = RegExpOptions &
  ParseOptions & {
    name?: string;
    ignoreCaptures?: boolean;
  };

class Layer {
  path: string;
  opts: LayerOptions;
  methods: string[] = [];
  stack: IMiddleware = [];
  paramNames: Key[] = [];
  regexp: RegExp;
  name: string;

  constructor(
    path: string,
    methods: string[],
    middleware: IMiddleware,
    opts?: LayerOptions
  ) {
    this.opts = opts || {};
    this.methods = methods;
    this.name = this.opts.name || "";
    this.stack = middleware;
    this.path = path;
    this.regexp = pathToRegExp(path, this.paramNames, this.opts);
  }

  match(path: string): boolean {
    return this.path === path;
  }

  params(captures: string[], existingParams: any): any {
    var params = existingParams || {};

    for (var len = captures.length, i = 0; i < len; i++) {
      if (this.paramNames[i]) {
        var c = captures[i];
        params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
      }
    }

    return params;
  }

  captures(path: string): string[] {
    if (this.opts.ignoreCaptures) return [];
    const matched = path.match(this.regexp);
    if (matched) {
      return matched.slice(1);
    } else {
      return [];
    }
  }
}

export { Layer, LayerOptions };
