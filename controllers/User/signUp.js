import express from "express";
import mongoose from "mongoose";

import User from "../../model/userModel.js";

const signUp = async (req, res, next) => {
  const userInputData = req.body;
  try {
    const newUser = new User(userInputData);
    await newUser.save();
    return res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export default signUp;
