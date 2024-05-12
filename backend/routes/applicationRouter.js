import express from "express";
import {employerGetAllApplications, jobSeekerGetAllApplications, jobSeekerDeleteApplication, postApplication} from "../controllers/applicationController.js"
import { isAuthenticated} from './../middlewares/auth.js';
const router = express.Router();

router.post("/post", isAuthenticated,postApplication);
router.get("/employer/getall",isAuthenticated, employerGetAllApplications);
router.get("/jobseeker/getall",isAuthenticated, jobSeekerGetAllApplications);
router.delete("/delete/:id",isAuthenticated, jobSeekerDeleteApplication);


export default router