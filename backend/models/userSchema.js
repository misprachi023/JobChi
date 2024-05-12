import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [20, "Name must be at most 20 characters"],

    },
    email:{
        type: String,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please provide a valid email"],
        
    },
    phone:{
        type: Number,
        required: [true, "Phone number is required"],
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must be at least 8 characters"],
        maxLength: [20, "Password must be at most 20 characters"],
        select: false
        
    },
    role:{
        type: String,
        required:[true, "Role is required"],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
})

//HASHING PASSWORD
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//COMPARE PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);

};

//GENERATE JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

export const User = mongoose.model("User", userSchema);
