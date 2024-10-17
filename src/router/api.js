import express from "express";





const router = express.Router();

const initApiRouter = (app) => {
    // router.all("*", checkUserJWT);

    //register
  


    return app.use("/api", router);
};

export default initApiRouter;
