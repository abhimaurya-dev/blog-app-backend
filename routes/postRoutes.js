import express from "express";
import { createPostController } from "../controllers/Post/createPostController.js";
import { isUserLoggedIn } from "../middlewares/userMiddlewares/isUserLoggedInMiddleware.js";

const router = express.Router();

router.post("/create", isUserLoggedIn, createPostController);

export default router;
