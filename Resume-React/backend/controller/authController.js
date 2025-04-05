const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({success: false, error: { email: "Email already exists" } });
    }

    // Create a user in the database
    const user = await User.create(req.body);

    // Generate a token
    const token = jwt.sign(
      { user: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 2nd video
    res.cookie("jwt",token);

    // Send response with user and token
    return res.status(201).json({success: true,message:"Signup successfully",
      user: {
        id: user._id,
        email: user.email,
        password: user.password,
      },
      token,
    });
  } catch (error) {
    if(error.name === "ValidationError"){
        const errors={};
        Object.keys(error.errors).forEach(key=>{
            errors[key]=error.errors[key].message;
        })

        return res.status(500).json({ success: false,message: "Signup failed" });
    }
   
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { user: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        // 2nd video
        res.cookie("jwt",token);
        
        // Send response with user and token
        return res.status(200).json({ message:"Login Successful", success: true,
          name:user.username,
          user: {
            id: user._id,
            username:user.username,
            email: user.email,
            password: user.password,
          },
          token,
          // message,
          
        });
      } else {
        return res.status(400).json({ success: false, message: "Incorrect Password" });
      }
    } else {
      return res.status(400).json({  success: false,message: "No user found with this email" });
    }
  } catch (error) {
    return res.status(500).json({  success: false,message: "Login failed" });
  }
};

module.exports = { createUser, loginUser };
