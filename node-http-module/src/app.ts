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
      this.run();
      return;
    }

    throw new Error("App already created..");
  }

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

  getHanderResolver(
    request: Request,
    response: Response,
    next: RequestHandler
  ) {
    const pathName = request.URL.pathname;
    const handler = this.gets[pathName];

    if (handler) {
      const _newHandler = this.createNextChain(handler, request, response);
      _newHandler();
    } else {
      next();
    }
  }

  private run() {
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

  get(url: string, handler: RequestHandler) {
    if (this.gets[url]) {
      this.gets[url].push(handler);
    } else {
      this.gets[url] = [handler];
    }
  }

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
