import express from "express";
import { signUpUserController } from "../controllers/User/signUpUserController.js";
import { logInUserController } from "../controllers/User/logInUserController.js";
import { logOutUserController } from "../controllers/User/logOutUserController.js";
import { isUserLoggedIn } from "../middlewares/userMiddlewares/isUserLoggedInMiddleware.js";
import { updateUserController } from "../controllers/User/updateUserController.js";

// creating express router instance
const router = express.Router();

// user routes
router.post("/SignUp", signUpUserController);
router.post("/login", logInUserController);
router.post("/logout", isUserLoggedIn, logOutUserController);
router.put("/update", isUserLoggedIn, updateUserController);

export default router;
