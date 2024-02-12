import express, { Router } from "express";
import { getHotels, getExactHotel, getDiscountedRooms, getHotelsTypes, browseByPropertyType } from "../controllers/hotel-controller";

const router: Router = express.Router();

router.get("/", getHotels);
router.get("/:id", getExactHotel);
router.get("/r/discount", getDiscountedRooms);
router.get("/h/types", getHotelsTypes);
router.post("/h/types", browseByPropertyType);

export default router;