import express, { Router } from "express";
import {getRatings, postRating, updateRating} from "../controllers/rating-controller";

const router: Router = express.Router();

router.get("/", getRatings);
router.post("/", postRating);
router.post("/update", updateRating)

export default router;