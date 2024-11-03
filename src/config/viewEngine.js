import express from "express";
import path from "path";

/**
 *
 * @param {*} app - express app
 */
const configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", path.join("./src", "views"));
};
export default configViewEngine;
