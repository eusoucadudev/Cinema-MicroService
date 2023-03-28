const express = require("express");
const httpProxy = require("express-http-proxy");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const authController = require("./authController");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

const options = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl;
  },
};

app.post("/login", authController.doLogin);

app.post("/logout", authController.validateToken, authController.doLogout);

const moviesServiceProxy = httpProxy(process.env.MOVIES_API, options);
const catalogServiceProxy = httpProxy(process.env.CATALOG_API, options);

app.use("/movies", moviesServiceProxy);

app.get(/cities|cinemas/i, catalogServiceProxy);

app.listen(process.env.PORT, () => {
  console.log(`API Gateway started at ${process.env.PORT}`);
});
