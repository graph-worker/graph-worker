import { KRequest } from "./KRequest";

class KResponse {
  req: KRequest;
  event: FetchEvent;
  _body: any;

  constructor(request: KRequest, event: FetchEvent) {
    this.req = request;
    this.event = event;
  }

  get body() {
    return this._body;
  }

  set body(val) {
    this._body = val;
  }

  end(body) {
    const promise = Promise.resolve(new Response(body));
    this.event.respondWith(promise);
  }
}

export { KResponse };
