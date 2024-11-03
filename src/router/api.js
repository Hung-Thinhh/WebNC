import express from "express";
import { EditUserController ,deleteUserController,AddUserController} from '../controller/userController';
import {handleSignup,handleLogin,handleLogout} from '../controller/authenController'
import {checkUserJWT,checkUserPermission} from '../middleware/jwt'
const router = express.Router();

const initApiRouter = (app) => {
    router.all("*", checkUserJWT);

    router.post("/editUser", checkUserPermission,(req, res) => {
        EditUserController(req,res)
    });
    router.post("/addUser",checkUserPermission, (req, res) => {
        AddUserController(req,res)
    });
    router.post("/delete-user/:id",checkUserPermission, (req, res) => {
        deleteUserController(req,res)
    });
    router.post("/signup", (req, res) => {
        handleSignup(req,res)
    });
    router.post("/login", (req, res) => {
        handleLogin(req,res)
    });
    router.get("/logout", (req, res) => {
        handleLogout(req, res)
    });
  


    return app.use("/api", router);
};

export default initApiRouter;
