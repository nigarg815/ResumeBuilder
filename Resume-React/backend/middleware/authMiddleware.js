const jwt=require("jsonwebtoken");
const User=require("../models/userSchema");

const requireAuth=(req,res,next)=>{
    const {jwt:token}=req.cookies;

    // check if the user has token
    if(token){
        const isValid=jwt.verify(token,process.env.JWT_SECRET);

        // Check if token is valid or not
        if(isValid){
            next();
        }
        else{
            res.redirect("/login");
        }
    }
};

const checkUser=(req,res,next)=>{
    const {jwt:token}=req.cookies;
    res.locals.user=null;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,async(err,decoded)=>{
            if(err)next();
            const user=await User.findById(decoded.user);
            res.locals.user=user;
            next();
        })
    }
    else{
        next();
    }
}

module.exports={requireAuth,checkUser};