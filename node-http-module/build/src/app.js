import http from "http";
// import { MiddlewareFunction } from "../src/types/index";
let singletonServer = null;
export class App {
    constructor() {
        this.middlewares = [];
        this.gets = {};
        if (!singletonServer) {
            this.server = http.createServer();
            singletonServer = this.server;
            this.run();
            return;
        }
        throw new Error("App already created..");
    }
    createNextChain(handlers, request, response) {
        const _middlewaresChainArray = [...handlers];
        for (let index = _middlewaresChainArray.length - 1; index >= 0; index--) {
            const slast = _middlewaresChainArray[index];
            const _next = _middlewaresChainArray[index + 1]
                ? _middlewaresChainArray[index + 1]
                : () => { };
            const next = () => void slast(request, response, _next);
            _middlewaresChainArray[index] = next;
        }
        return _middlewaresChainArray[0] || (() => { });
    }
    getHanderResolver(request, response, next) {
        const pathName = request.URL.pathname;
        const handler = this.gets[pathName];
        if (handler) {
            const _newHandler = this.createNextChain(handler, request, response);
            _newHandler();
        }
        else {
            next();
        }
    }
    run() {
        this.server.on("request", (request, response) => {
            const requiredMiddlewares = [
                this.getHanderResolver.bind(this),
            ];
            const chainHandlers = [
                ...this.middlewares,
                ...requiredMiddlewares,
            ];
            const handler = this.createNextChain(chainHandlers, request, response);
            handler();
        });
    }
    get(url, handler) {
        if (this.gets[url]) {
            this.gets[url].push(handler);
        }
        else {
            this.gets[url] = [handler];
        }
    }
    use(middleware) {
        this.middlewares.push(middleware);
    }
    listen(port) {
        return new Promise((resolve, reject) => {
            if (!port)
                reject("port is required.");
            this.server.listen({
                port,
            }, () => resolve());
        });
    }
}
//# sourceMappingURL=app.js.map