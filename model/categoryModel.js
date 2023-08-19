import mongoose from "mongoose";

const catergorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", catergorySchema);

export default Category;
