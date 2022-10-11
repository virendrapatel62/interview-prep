// import { ServerResponse } from "http";
// import { parse } from "url";

// const allowCors = (server) =>
//   server.on("request", (request, response) => {
//     response.setHeader("Access-Control-Allow-Origin", "*");
//   });

// const JSONBodyParser = (server) =>
//   server.on("request", (request, resonse) => {
//     const buffers = [];
//     request.on("data", (dataPart) => {
//       buffers.push(dataPart);
//     });

//     request.on("end", () => {
//       const body = buffers.length ? JSON.parse(Buffer.concat(buffers).toString()) : {};
//       request.body = body;
//     });
//   });

//   allowCors(server);
//   parseQueryString(server);
//   JSONBodyParser(server);
//   injectGetHandler(server);
//   injectPostHandler(server);
// };
