import Post from "../../model/postModel.js";

export const getAllPostControllers = async (req, res, next) => {
  try {
    const allPosts = await Post.find()
      .populate("author_id")
      .populate("category_id");
    res.status(200).json({
      success: true,
      allPosts,
    });
  } catch (error) {
    return next(error);
  }
};
