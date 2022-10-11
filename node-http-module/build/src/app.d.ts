import { Request, RequestHandler, Response } from "./types/index";
export declare class App {
    private server;
    private middlewares;
    private gets;
    constructor();
    private createNextChain;
    getHanderResolver(request: Request, response: Response, next: RequestHandler): void;
    private run;
    get(url: string, handler: RequestHandler): void;
    use(middleware: RequestHandler): void;
    listen(port: number): Promise<void>;
}
