import express from 'express'
const router = express.Router();
import { HomeController } from '../controller/homeController';
import { AboutController } from '../controller/aboutController';
import { ContactController } from '../controller/contactController';
import { UserController } from '../controller/userController';

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

    return app.use("/", router);
}

export default initWebRouter;