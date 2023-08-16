import User from "../../model/userModel.js";
import ErrorHandler from "../../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const logInUserController = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameExist = await User.findOne({ username: username }).select(
      "+password"
    );
    if (!usernameExist) {
      return next(new ErrorHandler("Invalid Username or Password", 403));
    }
    const passwordMatch = await bcrypt.compare(
      password,
      usernameExist.password
    );
    if (!passwordMatch) {
      return next(new ErrorHandler("Invalid Username or Password", 403));
    }
    const authToken = await usernameExist.generateAuthToken();
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
