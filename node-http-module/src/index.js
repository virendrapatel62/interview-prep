import http from "http";
import { configureServer } from "./utils.js";
import { faker } from "@faker-js/faker";

const app = http.createServer();

configureServer(app);

app.get("/api/courses", (request, response) => {
  response.json(
    new Array(+request.query.count || 100).fill().map(() => ({
      name: faker.name.fullName(),
      gender: faker.name.gender(),
      jobTitle: faker.name.jobTitle(),
      jobDescription: faker.name.jobDescriptor(),
    }))
  );
});

app.post("/api/courses", (request, response) => {
  response.json(request.body);
});

app.listen(3000, () => {
  console.log("Listening at 3000");
  console.log("visit : http://localhost:3000/api/courses?count=12");
});
