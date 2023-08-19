import express from "express";
import { createPostController } from "../controllers/Post/createPostController.js";
import { isUserLoggedIn } from "../middlewares/userMiddlewares/isUserLoggedInMiddleware.js";
import { getAllPostControllers } from "../controllers/Post/getAllPostController.js";
import { deletePostController } from "../controllers/Post/deletePostController.js";

const router = express.Router();

router.post("/create", isUserLoggedIn, createPostController);
router.get("/all", getAllPostControllers);
router.delete("/:postId", isUserLoggedIn, deletePostController);

export default router;
