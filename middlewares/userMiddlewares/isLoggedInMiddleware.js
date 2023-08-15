import jwt from "jsonwebtoken";
import User from "../../model/userModel.js";
import ErrorHandler from "../../utils/errorHandler.js";

export const isLoggedIn = async (req, res, next) => {
  const userAuthToken = req.cookies.jwt;
  if (!userAuthToken) {
    return next(new ErrorHandler("Unauthorized access", 401));
  }

  try {
    // eslint-disable-next-line no-undef
    const userPlayload = jwt.verify(userAuthToken, process.env.SECRET_CODE);
    const userData = await User.findById({ _id: userPlayload.userId });
    req.user = userData;
    req.userAuthToken = userAuthToken;
    next();
  } catch (error) {
    return next(error);
  }
};
