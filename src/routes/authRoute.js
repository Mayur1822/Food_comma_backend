const express =require("express");
const { loginUser,logoutUser,forgetPassword,resetPassword}=require("../controller/authController.js");
const reGenratorTokens=require("../controller/refreshController.js");
const {isloggedin}=require("../validator/authValidator.js")
const router= express.Router();
router.post("/login",loginUser);
router.post("/refresh",reGenratorTokens);
router.post("/logout",isloggedin,logoutUser);
router.post("/forgetpassword",forgetPassword);
router.post("/resetpassword",resetPassword);
module.exports=router;