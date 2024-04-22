import express, { Router } from "express";
import {deleteRating, existingRating, getRatings, postRating, getUsersRatings} from "../controllers/rating-controller";

const router: Router = express.Router();

router.get("/:id", getUsersRatings)
router.post("/", getRatings);
router.post("/post", postRating)
router.post("/existingRating", existingRating)
router.delete("/deleteRating", deleteRating)

export default router;