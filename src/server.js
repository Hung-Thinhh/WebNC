import express from "express";
import viewEngine from "./config/viewEngine.js";
import initWebRouter from "./router/web.js";
import initApiRouter from "./router/api.js";
import bodyParser from "body-parser";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Initialize client.
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
});
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: "keyboard cat",
    cookie: { secure: false },
  })
);

viewEngine(app);
initWebRouter(app);
initApiRouter(app);

app.listen(PORT, () => {
  console.log(" Running on port " + PORT + ":  http://localhost:" + PORT);
});
