import url from "url";
export const UrlParser = () => (request, response, next) => {
    request.URL = url.parse(request.url, true);
    request.query = request.URL.query;
    next();
};
//# sourceMappingURL=url-parser.js.map