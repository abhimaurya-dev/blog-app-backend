import jwt from "jsonwebtoken";
import ErrorHandler from "../../utils/errorHandler.js";

export const isUserLoggedIn = async (req, res, next) => {
  try {
    const userAuthToken = req.headers.authorization.slice(
      7,
      req.headers.authorization.length
    );
    if (!userAuthToken) {
      return next(new ErrorHandler("Unauthorized access", 401));
    }
    // eslint-disable-next-line no-undef
    const userPlayload = jwt.verify(userAuthToken, process.env.SECRET_CODE);
    req.userId = userPlayload.userId;
    req.userAuthToken = userAuthToken;
    next();
  } catch (error) {
    return next(error);
  }
};
