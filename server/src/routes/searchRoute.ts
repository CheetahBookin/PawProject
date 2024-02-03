import { searchForHotel, searchForTrip } from "../controllers/searching-controller"; 
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/", searchForHotel);
router.post("/trip", searchForTrip);

export default router;