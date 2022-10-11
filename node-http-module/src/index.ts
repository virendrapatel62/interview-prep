import "./core/response";
import { App } from "./app";
import { UrlParser } from "./middlewares/url-parser";
import { faker } from "@faker-js/faker";
const app = new App();
app.use(UrlParser());

app.listen(3000).then(() => {
  console.log("listening on port 3000");
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

app.get("/api/courses", (req, res, next) => {
  const query = req.query;
  const { name } = faker;
  res.json({
    courses: new Array(+query.count).fill(null).map(() => ({
      title: faker.lorem.words(5),
      author: name.fullName(),
      price: faker.commerce.price(),
      description: faker.lorem.paragraphs(3),
      image: faker.image.imageUrl(),
      authorImage: faker.image.avatar(),
    })),
  });
});
