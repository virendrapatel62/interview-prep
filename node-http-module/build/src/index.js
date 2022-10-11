import "./core/response";
import { App } from "./app";
import { UrlParser } from "./middlewares/url-parser";
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
    res.json({
        query,
        courses: [],
    });
});
app.get("/api/students", (req, res, next) => {
    res.json({
        stuents: [],
    });
});
//# sourceMappingURL=index.js.map