import mongoose from "mongoose";
import validator from "validator";

const applicationSchema = new mongoose.Schema({
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
    coverLetter:{
        type: String,
        required: [true, "Cover Letter is required"],
    },
    phone:{
        type: Number,
        required: [true, "Phone number is required"],
    },
    address:{
        type: String,
        required: [true, "Address is required"],
    },
    resume:{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        }
    },
    applicantID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role:{
            type: String,
            enum: ["Job Seeker"],
            required: true,
        }
    },
    employerID:{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        role:{
            type: String,
            enum: ["Employer"],
            required: true,
        }
    }
   
   
})

export const Application= mongoose.model("Application", applicationSchema)