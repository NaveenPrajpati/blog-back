const express = require("express");
const { registerUser, loginUser, createPassword} = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");
const {sendOtp, resetOtp} = require("../controller/authController");
const router = express.Router();

router.post("/auth",sendOtp);
router.post("/auth/reset",resetOtp);
router.post("/auth/reset/new",createPassword);

router.post("/register",registerUser);
router.post("/login",loginUser)
// router.get("/current",validateToken,currentUser)




module.exports=router;