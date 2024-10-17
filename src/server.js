import express from 'express'
import viewEngine from "../viewEngine.js"
import initWebRouter from "./router/web.js";
import initApiRouter from "./router/api.js";
import bodyParser from "body-parser";
require('dotenv').config()


const app = express()
const PORT = process.env.PORT || 8080
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

viewEngine(app)
initWebRouter(app);
initApiRouter(app);



app.listen(PORT, () => {
    console.log(" Running on port " + PORT + ":  http://localhost:" + PORT)
})