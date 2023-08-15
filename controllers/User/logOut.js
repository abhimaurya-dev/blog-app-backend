// import User from "../../model/userModel";
import ErrorHandler from "../../utils/errorHandler.js";

export const logOut = async (req, res, next) => {
  const userId = req.user._id;
  if (!userId) {
    return next(new ErrorHandler("User Already logged Out", 403));
  }
  try {
    await res.clearCookie("jwt");
    req.user.token = "";
    await req.user.save();
    console.log(req.user);
    res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    return next(error);
  }
};
