import User from "../../model/userModel.js";

export const signUpUserController = async (req, res, next) => {
  const userInputData = req.body;
  try {
    const newUser = new User(userInputData);
    await newUser.save();
    const authToken = await newUser.generateAuthToken();
    res.cookie("jwt-token", authToken, {
      httpOnly: true,
      // eslint-disable-next-line no-undef
      maxAge: process.env.TOKEN_EXPIRATION_AGE,
    });
    return res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
};
