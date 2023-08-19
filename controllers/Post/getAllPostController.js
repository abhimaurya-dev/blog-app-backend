import Post from "../../model/postModel.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getAllPostControllers = async (req, res, next) => {
  try {
    const allPosts = await Post.find({})
      .populate("author")
      .populate("category");
    if (!allPosts.length) {
      return next(new ErrorHandler("Posts not found", 404));
    }
    res.status(200).json({
      success: true,
      allPosts,
    });
  } catch (error) {
    return next(error);
  }
};
