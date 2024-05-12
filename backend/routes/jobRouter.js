import express from "express";
import {getAlljobs,getmyJobs, postJob, updateJob, deleteJob, getSinglejob} from "../controllers/jobController.js"
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.get("/getall", getAlljobs);
router.post("/post",isAuthenticated, postJob);
router.get("/getmyjobs",isAuthenticated, getmyJobs);
router.put("/update/:id",isAuthenticated, updateJob);
router.delete("/delete/:id",isAuthenticated, deleteJob);
router.get("/:id",  getSinglejob);

export default router