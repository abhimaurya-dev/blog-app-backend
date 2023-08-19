import Category from "../../model/categoryModel.js";

export const getAllCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return next(error);
  }
};
