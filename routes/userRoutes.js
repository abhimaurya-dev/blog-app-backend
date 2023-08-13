import express from "express";
import signUpController from "../controllers/User/signUp.js";

const router = express.Router();

router.post("/SignUp", signUpController);

export default router;
