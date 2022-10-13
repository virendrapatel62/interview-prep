import { App } from "./app";
import { UrlParser } from "./middlewares/url-parser";
import { faker } from "@faker-js/faker";

const app = new App();
app.use(UrlParser());
const PORT = 3000;

app.listen(PORT).then(() => {
  console.log(`listening on port ${PORT}`);
  console.log([`http://localhost:${PORT}/api/courses`]);
});

app.use(function methodLogger(request, __, next) {
  console.log(request.method);
  next();
});

app.use(function urlLogger(request, __, next) {
  console.log(request.query);
  console.log(request.URL.pathname);
  next();
});

app.get("/ping", (request, response) => {
  response.json("pong");
});
app.get("/api", (request, response) => {
  response.json({
    message: "Api is working..",
    availableUrls: [
      { url: `http://${request.URL.host}/api/courses`, query: { count: 90 } },
      { url: `http://${request.URL.host}/ping` },
    ],
  });
});

app.get("/api/courses", (req, res, next) => {
  const query = req.query;
  const { name } = faker;
  res.json({
    courses: new Array(+query.count || 10).fill(null).map(() => ({
      title: faker.lorem.words(5),
      author: name.fullName(),
      price: faker.commerce.price(),
      description: faker.lorem.paragraphs(3),
      image: faker.image.imageUrl(),
      authorImage: faker.image.avatar(),
    })),
  });
});
