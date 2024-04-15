import express, { Router } from "express";
import {deleteRating, existingRating, getRatings, postRating} from "../controllers/rating-controller";

const router: Router = express.Router();

router.post("/", getRatings);
router.post("/post", postRating)
router.post("/existingRating", existingRating)
router.delete("/deleteRating", deleteRating)

export default router;