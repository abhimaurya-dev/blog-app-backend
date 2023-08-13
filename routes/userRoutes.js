import express from "express";
import { signUp as signUpController } from "../controllers/User/signUp.js";
import { login as loginController } from "../controllers/User/login.js";

// creating express router instance
const router = express.Router();

// user routes
router.post("/SignUp", signUpController);
router.post("/login", loginController);

export default router;
