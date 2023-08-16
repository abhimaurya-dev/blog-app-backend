// import User from "../../model/userModel";
import User from "../../model/userModel.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const logOutUserController = async (req, res, next) => {
  const userId = req.userId;
  if (!userId) {
    return next(new ErrorHandler("User Already logged Out", 403));
  }
  try {
    await res.clearCookie("jwt-token");
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { token: "" },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return next(error);
  }
};
