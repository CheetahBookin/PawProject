import express, { Router } from "express";
import {getRatings, postRating, updateRating} from "../controllers/rating-controller";

const router: Router = express.Router();

router.post("/", getRatings);
router.post("/post", postRating);
router.post("/update", updateRating)

export default router;