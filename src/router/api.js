import express from "express";
import { EditUserController ,deleteUserController,AddUserController} from '../controller/userController';

const router = express.Router();

const initApiRouter = (app) => {
    // router.all("*", checkUserJWT);

    router.post("/editUser", (req, res) => {
        EditUserController(req,res)
    });
    router.post("/addUser", (req, res) => {
        AddUserController(req,res)
    });
    router.post("/delete-user/:id", (req, res) => {
        deleteUserController(req,res)
    });
  


    return app.use("/api", router);
};

export default initApiRouter;
