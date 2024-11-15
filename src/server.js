import express from "express";
import viewEngine from "./config/viewEngine.js";
import initWebRouter from "./router/web.js";
import initApiRouter from "./router/api.js";
import bodyParser from "body-parser";
import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import {connection} from "./config/connectDB copy.js";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.REACT_URL);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  if (req.method === 'OPTIONS') {
      res.sendStatus(200);
  } else {
      next();
  }
});
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
connection()
initWebRouter(app);
initApiRouter(app);

app.listen(PORT, () => {
  console.log(" Running on port " + PORT + ":  http://localhost:" + PORT);
});
