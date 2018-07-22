import { Delegator } from "./utils/delegates";
import { KRequest } from "./KRequest";
import { KResponse } from "./KResponse";

class Context {
  attachment: any;
  redirect: any;
  remove: any;
  vary: any;
  set: any;
  append: any;
  flushHeaders: any;
  status: number = 404;
  message: string = "";
  body: any;
  length: number = 0;
  type: any;
  lastModified: any;
  etag: any;
  headerSent: any;
  writable: any;

  method: string = "GET";
  path: string = "";
  captures: string[] = [];
  params: any;

  constructor(public req: KRequest, public res: KResponse) {
    new Delegator(this, "res")
      .method("attachment")
      .method("redirect")
      .method("remove")
      .method("vary")
      .method("set")
      .method("append")
      .method("flushHeaders")
      .access("status")
      .access("message")
      .access("body")
      .access("length")
      .access("type")
      .access("lastModified")
      .access("etag")
      .getter("headerSent")
      .getter("writable");

    new Delegator(this, "req")
      .method("acceptsLanguages")
      .method("acceptsEncodings")
      .method("acceptsCharsets")
      .method("accepts")
      .method("get")
      .method("is")
      .access("querystring")
      .access("idempotent")
      .access("socket")
      .access("search")
      .access("method")
      .access("query")
      .access("path")
      .access("url")
      .access("accept")
      .getter("origin")
      .getter("href")
      .getter("subdomains")
      .getter("protocol")
      .getter("host")
      .getter("hostname")
      .getter("URL")
      .getter("header")
      .getter("headers")
      .getter("secure")
      .getter("stale")
      .getter("fresh")
      .getter("ips")
      .getter("ip");
  }

  onerror(err: Error) {}
}

export { Context };
