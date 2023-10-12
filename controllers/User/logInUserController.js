import User from "../../model/userModel.js";
import ErrorHandler from "../../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const logInUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email: email }).select("+password");
    if (!emailExist) {
      return next(new ErrorHandler("Invalid Username or Password", 403));
    }
    const passwordMatch = await bcrypt.compare(password, emailExist.password);
    if (!passwordMatch) {
      return next(new ErrorHandler("Invalid Username or Password", 403));
    }
    const authToken = await emailExist.generateAuthToken();
    res.cookie("jwt-token", authToken, {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      maxAge: process.env.TOKEN_EXPIRATION_AGE,
    });
    res.status(200).json({
      success: true,
      message: "Successful login",
    });
  } catch (error) {
    return next(error);
  }
};
