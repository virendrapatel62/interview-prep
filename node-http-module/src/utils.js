import { ServerResponse } from "http";
import { parse } from "url";

const parseQueryString = (server) => {
  server.on("request", (request, resonse) => {
    const _url = parse(request.url, true);
    request.pathname = _url.pathname;
    request.query = _url.query;
  });
};

const JSONBodyParser = (server) =>
  server.on("request", (request, resonse) => {
    const buffers = [];
    request.on("data", (dataPart) => {
      buffers.push(dataPart);
    });

    request.on("end", () => {
      const body = buffers.length ? JSON.parse(Buffer.concat(buffers)) : {};
      request.body = body;
    });
  });

const injectGetHandler = (server) =>
  (server.get = function (url, handler) {
    server.on("request", (request, response) => {
      if (request.method == "GET" && url === request.pathname) {
        handler(request, response);
      }
    });
  });

const injectPostHandler = (server) =>
  (server.post = function (url, handler) {
    server.on("request", (request, response) => {
      if (request.method == "POST" && request.pathname === url) {
        request.on("end", () => {
          handler(request, response);
        });
      }
    });
  });

export const configureServer = (server) => {
  ServerResponse.prototype.json = function (data) {
    this.setHeader("Content-Type", "text/json");
    this.write(JSON.stringify(data));
    this.end();
  };

  parseQueryString(server);
  JSONBodyParser(server);
  injectGetHandler(server);
  injectPostHandler(server);
};
