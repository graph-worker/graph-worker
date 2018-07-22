class KRequest {
  req: Request;

  constructor(req) {
    this.req = req;
  }

  get headers() {
    return this.req.headers;
  }

  get url() {
    return this.req.url;
  }

  get href() {
    // support: `GET http://example.com/foo`
    if (/^https?:\/\//i.test(this.url)) return this.url;
    return this.origin + this.url;
  }

  get method() {
    return this.req.method;
  }

  get path() {
    return this.URL.pathname;
  }

  get querystring() {
    return this.URL.search.replace("?", "") || "";
  }

  get search() {
    if (!this.querystring) return "";
    return `?${this.querystring}`;
  }

  get origin() {
    return `${this.protocol}://${this.host}`;
  }

  get originalUrl() {
    return `${this.protocol}://${this.host}`;
  }

  get protocol() {
    return this.URL.protocol;
  }

  get URL() {
    return new URL(this.url);
  }

  get host() {
    return this.URL.host;
  }

  get idempotent() {
    const methods = ["GET", "HEAD", "PUT", "DELETE", "OPTIONS", "TRACE"];
    return !!~methods.indexOf(this.method);
  }

  get hostname() {
    const host = this.host;
    if (!host) return "";
    if ("[" == host[0]) return this.URL.hostname || ""; // IPv6
    return host.split(":")[0];
  }
}

export { KRequest };
