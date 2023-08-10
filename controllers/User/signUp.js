const express = require("express");
const mongoose = require("mongoose");
const User = require("../../model/userModel");

const signUp = async (req, res) => {
  const userInputData = req.body;
  const newUser = new User(userInputData);
  try {
    await newUser.save();
    return res.status(201).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = signUp;
