import express from "express";
import { EditUserController ,deleteUserController,AddUserController,getProfile} from '../controller/userController';
import { handleSignup, handleLogin, handleLogout, accountUser } from '../controller/authenController'
import {getNhom} from '../controller/nhomController'
import {getListSanPham,getSanPham} from '../controller/sanphamController'
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
    router.get("/account",(req, res) => {
        accountUser(req, res)
    })
    router.get("/profile",(req, res) => {
        getProfile(req, res)
    })
    router.get("/getNhom",(req, res) => {
        getNhom(req, res)
    })
    router.get("/getListSanPham/:id",(req, res) => {
        getListSanPham(req, res)
    })
    router.get("/getSanPham/:id",(req, res) => {
        getSanPham(req, res)
    })

  


    return app.use("/api", router);
};

export default initApiRouter;
