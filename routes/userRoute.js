const express = require("express");
const { registerUser, loginUser, currentUser } = require("../controller/userController");
const validateToken = require("../middleware/validateTokenHandler");
const {sendOtp} = require("../controller/authController");
const router = express.Router();

router.post("/auth",sendOtp);
router.post("/register",registerUser);
router.post("/login",loginUser)
// router.get("/current",validateToken,currentUser)




module.exports=router;