import Post from "../../model/postModel.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const getUserAllPostController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({
      author: userId,
    });
    if (!posts.length) {
      return next(new ErrorHandler("Posts not found", 404));
    }
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    return next(error);
  }
};
