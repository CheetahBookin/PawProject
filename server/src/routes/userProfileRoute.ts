import express, { Router } from "express";
import { createUserProfile, getMode, getUserProfile, updateUserProfile } from "../controllers/user-profile-controller";

const router: Router = express.Router();

router.get("/:id", getUserProfile)
router.post("/", createUserProfile)
router.put("/", updateUserProfile)
router.get("/mode/:id", getMode)

export default router;