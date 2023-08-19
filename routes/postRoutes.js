import express from "express";
import { createPostController } from "../controllers/Post/createPostController.js";
import { isUserLoggedIn } from "../middlewares/userMiddlewares/isUserLoggedInMiddleware.js";
import { getAllPostControllers } from "../controllers/Post/getAllPostController.js";

const router = express.Router();

router.post("/create", isUserLoggedIn, createPostController);
router.get("/all", getAllPostControllers);

export default router;
