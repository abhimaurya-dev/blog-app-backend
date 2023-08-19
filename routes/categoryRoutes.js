import express from "express";
import { createCategoryController } from "../controllers/Category/createCategory.js";
import { getAllCategory } from "../controllers/Category/getAllCategory.js";

const router = express.Router();

router.post("/new", createCategoryController);
router.get("/all", getAllCategory);

export default router;
