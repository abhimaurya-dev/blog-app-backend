import Category from "../../model/categoryModel.js";

export const createCategoryController = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({
      name,
      description,
    });
    await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return next(error);
  }
};
