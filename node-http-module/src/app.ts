import "./core"; // imorting to inject methods to prorotype
import http, { IncomingMessage, OutgoingMessage, request } from "http";
import { Request, RequestHandler, Response } from "./types/index";

let singletonServer: http.Server | null = null;

export class App {
  private server: http.Server;
  private middlewares: RequestHandler[] = [];
  private gets: Record<string, RequestHandler[]> = {};

  constructor() {
    if (!singletonServer) {
      this.server = http.createServer();
      singletonServer = this.server;
      this.setupRequestListener();
      return;
    }

    throw new Error("App already created..");
  }

  // creates a middleware and chain
  private createNextChain(
    handlers: RequestHandler[],
    request: Request,
    response: Response
  ) {
    const _middlewaresChainArray = [...handlers];
    for (let index = _middlewaresChainArray.length - 1; index >= 0; index--) {
      const slast = _middlewaresChainArray[index];
      const _next = _middlewaresChainArray[index + 1]
        ? _middlewaresChainArray[index + 1]
        : () => {};
      const next = () => void slast(request, response, _next);
      _middlewaresChainArray[index] = next;
    }

    return _middlewaresChainArray[0] || (() => {});
  }

  // It resolves which handler to run for the url.
  getHanderResolver(
    request: Request,
    response: Response,
    next: RequestHandler
  ) {
    const pathName = request.URL.pathname;
    const handler = this.gets[pathName];

    if (handler) {
      // if we have registered multiple handler for single url, it creats a chain
      // using next() we can call next handler
      const _newHandler = this.createNextChain(handler, request, response);
      _newHandler();
    } else {
      // when handler is not there
      // no handler is registered for the url
      // it will call next middleware or not found handler.
      next();
    }
  }

  // will be registested on constructor to listen request.
  private setupRequestListener() {
    this.server.on("request", (request: Request, response: Response) => {
      const requiredMiddlewares: Readonly<RequestHandler[]> = [
        this.getHanderResolver.bind(this),
      ];

      const chainHandlers: RequestHandler[] = [
        ...this.middlewares,
        ...requiredMiddlewares,
      ];

      const handler = this.createNextChain(chainHandlers, request, response);
      handler();
    });
  }

  // storing get handlers
  get(url: string, handler: RequestHandler) {
    if (this.gets[url]) {
      this.gets[url].push(handler);
    } else {
      this.gets[url] = [handler];
    }
  }

  // registering middlewares
  //they will run before get,post any other handler in every request.
  use(middleware: RequestHandler) {
    this.middlewares.push(middleware);
  }

  listen(port: number): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!port) reject("port is required.");

      this.server.listen(
        {
          port,
        },
        () => resolve()
      );
    });
  }
}
