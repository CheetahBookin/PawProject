import express, { Router } from "express";
import { getHotels, getExactHotel, getDiscountedRooms } from "../controllers/hotel-controller";

const router: Router = express.Router();

router.get("/", getHotels);
router.get("/:id", getExactHotel);
router.get("/r/discount", getDiscountedRooms);

export default router;