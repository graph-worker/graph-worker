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
  status: any;
  message: any;
  body: any;
  length: any;
  type: any;
  lastModified: any;
  etag: any;
  headerSent: any;
  writable: any;

  constructor(public req: KRequest, public res: KResponse) {
    new Delegator(this, "response")
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

    new Delegator(this, "request")
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
