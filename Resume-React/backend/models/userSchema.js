const mongoose=require('mongoose');
const validator=require('validator');
// const Schema=mongoose.Schema;
const bcrypt=require('bcrypt');

const userSchema=new mongoose.Schema({
    // name:String,
    // email:String,
    // password:String
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[6,"Password must be at lease 6 charaters long"]
    }

});

// Hashing password before saving in database
userSchema.pre('save',async function(next) {
    const salt =await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt);
    next();
})

const User=mongoose.model('User',userSchema);
module.exports=User;