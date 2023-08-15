import express from "express";
import { signUp as signUpController } from "../controllers/User/signUp.js";
import { login as loginController } from "../controllers/User/login.js";
import { logOut as logOutController } from "../controllers/User/logOut.js";
import { isLoggedIn } from "../middlewares/userMiddlewares/isLoggedInMiddleware.js";

// creating express router instance
const router = express.Router();

// user routes
router.post("/SignUp", signUpController);
router.post("/login", loginController);
router.post("/logout", isLoggedIn, logOutController);

export default router;
