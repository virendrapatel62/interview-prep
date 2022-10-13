import { RequestHandler } from "../types/index";
import url from "url";

export const UrlParser: () => RequestHandler =
  () => (request, response, next) => {
    request.URL = url.parse(request.url, true);
    request.query = request.URL.query;
    request.URL = {
      ...request.URL,
      protocol: request.headers.host,
      host: request.headers.host,
    };
    next();
  };
