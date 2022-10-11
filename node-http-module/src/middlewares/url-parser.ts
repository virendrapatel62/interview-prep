import { RequestHandler } from "../types/index";
import url from "url";

export const UrlParser: () => RequestHandler =
  () => (request, response, next) => {
    request.URL = url.parse(request.url, true);
    request.query = request.URL.query;
    next();
  };
