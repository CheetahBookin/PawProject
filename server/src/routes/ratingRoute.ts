import express, { Router } from "express";
import { getRatings, postRating } from "../controllers/rating-controller";

const router: Router = express.Router();

router.get("/", getRatings);
router.post("/", postRating);

export default router;