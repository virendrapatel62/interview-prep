import { IncomingMessage, ServerResponse } from "http";
import { ParsedUrlQuery } from "querystring";
import { parse, UrlWithParsedQuery, UrlWithStringQuery } from "url";

export interface Response extends ServerResponse {
  json: (data: any) => void;
}
export interface Request extends IncomingMessage {
  URL: UrlWithParsedQuery;
  query: ParsedUrlQuery;
}

export type RequestHandler = (
  request?: Request,
  response?: Response,
  next?: RequestHandler
) => void;
