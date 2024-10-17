import express from 'express'
const router = express.Router();
import { HomeController } from '../controller/homeController';
import { AboutController } from '../controller/aboutController';
import { ContactController } from '../controller/contactController';
import { UserController,DetailUser,EditUser,addUser } from '../controller/userController';

const initWebRouter = (app) => {
    router.get("/", (req, res) => {
        HomeController(req,res)
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
    router.get("/addUser", (req, res) => {
        addUser(req,res)
    });

    router.get("/detail-user/:id", (req, res) => {
        DetailUser(req,res)
    });
    router.get("/edit-user/:id", (req, res) => {
        EditUser(req,res)
    });

    return app.use("/", router);
}

export default initWebRouter;