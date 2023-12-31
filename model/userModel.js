import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  profilePhoto: {
    type: String,
  },
  token: {
    type: String,
  },
});

// Method to generate jsonwebtoken Authentication token
userSchema.methods.generateAuthToken = async function (next) {
  try {
    const authToken = jwt.sign(
      { userId: this._id },
      // eslint-disable-next-line no-undef
      process.env.SECRET_CODE,
      // eslint-disable-next-line no-undef
      { expiresIn: process.env.TOKEN_EXPIRATION_AGE.toString() }
    );
    this.token = authToken;
    await this.save();
    return authToken;
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

userSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model("User", userSchema);
export default User;
