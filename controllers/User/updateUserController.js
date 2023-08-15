import User from "../../model/userModel.js";

export const updateUserController = async (req, res, next) => {
  try {
    const userUpdatedFields = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.userId },
      userUpdatedFields,
      { new: true }
    );
    await updatedUser.save();
    res.status(201).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return next(error);
  }
};
