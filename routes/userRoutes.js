const express = require("express");
const router = express.Router();
const signUpController = require("../controllers/User/signUp");

router.post("/SignUp", signUpController);

module.exports = router;
