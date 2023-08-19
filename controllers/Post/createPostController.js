import Category from "../../model/categoryModel.js";
import Post from "../../model/postModel.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const createPostController = async (req, res, next) => {
  try {
    const userId = req.userId;
    const categoryId = req.body.categoryId;

    const isCategoryValid = await Category.findById({ _id: categoryId });
    if (!isCategoryValid) {
      return next(new ErrorHandler("Category not found", 404));
    }
    const { title, content } = req.body;
    const newPost = new Post({
      title,
      content,
      category: categoryId,
      author: userId,
    });
    await newPost.save();
    res.status(201).json({
      success: true,
      message: "New post created successfully",
    });
  } catch (error) {
    return next(error);
  }
};
