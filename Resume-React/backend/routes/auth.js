const {Router}=require("express");
const {createUser,loginUser}=require("../controller/authController");
const router=Router();

router.post("/signup",createUser)
router.post("/login",loginUser);

module.exports=router