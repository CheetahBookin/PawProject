import { searchForHotel, searchForTrip, searchForCountryOrCity } from "../controllers/searching-controller"; 
import express, { Router } from "express";

const router: Router = express.Router();

router.post("/", searchForHotel);
router.post("/trip", searchForTrip);
router.post("/country-city", searchForCountryOrCity);

export default router;