import Post from "../../model/postModel.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const deletePostController = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return next(new ErrorHandler("PostID not found", 404));
    }
    const post = await Post.findById({ _id: postId }).populate("author");
    if (!post) {
      return next(new ErrorHandler("Post not found", 404));
    }
    // console.log(req.userId);
    if (post.author._id.toString() !== req.userId) {
      return next(new ErrorHandler("Unauthorized access to delete", 401));
    }
    await Post.findByIdAndDelete({ _id: postId });
    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};
