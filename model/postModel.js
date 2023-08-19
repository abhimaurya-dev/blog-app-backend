import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  created_At: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
  updated_At: {
    type: Date,
    required: true,
    default: new Date(Date.now()),
  },
});

// middleWares
postSchema.pre("save", function (next) {
  this.updated_At = new Date(Date.now());
  next();
});

const Post = mongoose.model("Post", postSchema);
export default Post;
