import User from "../../model/userModel.js";
import ErrorHandler from "../../utils/errorHandler.js";
import bcrypt from "bcryptjs";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameExist = await User.findOne({ username: username });
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
    res.cookie("jwt", authToken);
    res.status(200).json({
      success: true,
      message: "Successful login",
    });
  } catch (error) {
    return next(error);
  }
};
