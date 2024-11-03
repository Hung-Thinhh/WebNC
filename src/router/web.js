import express from 'express'
const router = express.Router();
import { HomeController } from '../controller/homeController';
import { AboutController } from '../controller/aboutController';
import { ContactController } from '../controller/contactController';
import { UserController,DetailUser,EditUser,addUser } from '../controller/userController';
import {checkUser,checkUserPermission} from '../middleware/jwt'

const initWebRouter = (app) => {
    router.all("*", checkUser);

    router.get("/", (req, res) => {
        HomeController(req,res)
    });
    router.get("/login", (req, res) => {
        return res.render('login');
    });
    router.get("/register", (req, res) => {
        return res.render('login');
    });
    router.get("/about", (req, res) => {
        AboutController(req,res)
    });
    router.get("/contact", (req, res) => {
        ContactController(req,res)
    });
    router.get("/user", (req, res) => {
        UserController(req,res)
    });
    router.get("/addUser",checkUserPermission, (req, res) => {
        addUser(req,res)
    });

    router.get("/detail-user/:id",checkUserPermission, (req, res) => {
        DetailUser(req,res)
    });
    router.get("/edit-user/:id",checkUserPermission, (req, res) => {
        EditUser(req,res)
    });
  

    return app.use("/", router);
}

export default initWebRouter;