import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { Job } from "../models/jobSchema.js"
import ErrorHandler from "../middlewares/error.js"


export const getAlljobs = catchAsyncError(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
        success: true,
        jobs,
    })
})

export const postJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("job Seeker is not allowed to access this resource", 400));
    }
    const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;
    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Please enter all job required fields", 400));
    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Please either provide salary range or fixed salary", 400));
    }

    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Cannot enter fixed salary and ranged salary together", 400));
    }
    const postedBy = req.user._id;
    const job = await Job.create({ title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo, postedBy });

    res.status(200).json({
        success: true,
        message: "Job posted successfully",
        job
    })
})

export const getmyJobs = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {

        return next(new ErrorHandler("job Seeker is not allowed to access this resource", 400));
    }

    const myjobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
        success: true,
        myjobs,
    })
})

export const updateJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("job Seeker is not allowed to access this resource", 400));
    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Jobs not found", 404));
    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Job updated successfully",
        job
    })

})

export const deleteJob = catchAsyncError(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("job Seeker is not allowed to access this resource", 400));
    }
    const {id}=req.params
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("Jobs not found", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted successfully",        
       
    })
})

export const getSinglejob=catchAsyncError(async(req,res,next)=>{
   const {id}=req.params;
   try {
    const job= await Job.findById(id)
    if (!job) {
        return next(new ErrorHandler("Jobs not found", 404));
    }
    res.status(200).json({
        success: true,
        job,
    })
   } catch (error) {
    return next(new ErrorHandler("invalid id/casterror", 404));
   }

})