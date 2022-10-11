/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import { UrlWithParsedQuery } from "url";
export interface Response extends ServerResponse {
    json: (data: any) => void;
}
export interface Request extends IncomingMessage {
    URL: UrlWithParsedQuery;
    query: ParsedUrlQuery;
}
export declare type RequestHandler = (request?: Request, response?: Response, next?: RequestHandler) => void;
