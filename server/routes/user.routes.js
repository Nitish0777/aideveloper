import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { body } from "express-validator";

const router = Router();

router.post("/register", 
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({min:6}).withMessage("Password must be at least 6 characters long"),
    userController.createUserController)


export default router;