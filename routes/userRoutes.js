import express from "express";
import signUpController from "../controllers/User/signUp.js";
import { login as loginController } from "../controllers/User/login.js";
const router = express.Router();

router.post("/SignUp", signUpController);
router.post("/login", loginController);

export default router;
