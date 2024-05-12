import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        minLength: [3, "Job Title must be at least 3 characters"],
        maxLength: [50, "Job Title cannot be more than 50 characters"],
    },
    description: {
        type: String,
        required: [true, "Job Description is required"],
        minLength: [50, "Job Description must be at least 50 characters"],
        maxLength: [300, "Job Description cannot be more than 300 characters"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],

    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    location: {
        type: String,
        required: [true, "Location is required"],
        minLength: [50, "Location must be at least 50 characters"],
    },
    fixedSalary: {
        type: Number,
        minLength: [4, "Fixed Salary cmust contains at least 4 digits"],
        maxLength: [9, "Fixed Salary cannot be more than 9 digits"],
        
    },
    salaryFrom: {
        type: Number,
        minLength: [4, "Salary Form cmust contains at least 4 digits"],
        maxLength: [9, "Salary Form cannot be more than 9 digits"],
    },
    salaryTo: {
        type: Number,
        minLength: [4, "Salary Form cmust contains at least 4 digits"],
        maxLength: [9, "Salary Form cannot be more than 9 digits"],
    },
    expired:{
        type: Boolean,
        default: false
    },
    jobPostedOn:{
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export const Job = mongoose.model("Job", jobSchema);